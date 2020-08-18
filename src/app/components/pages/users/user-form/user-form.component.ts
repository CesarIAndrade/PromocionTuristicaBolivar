import { Component, OnInit, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(
    private location: Location,
    private userService: UsersService,
    private dialog: MatDialog
  ) {
    this.userForm = new FormGroup({
      userId: new FormControl(''),
      personId: new FormControl(''),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      document: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[0-9]\d*)?$/),
      ]),
      names: new FormControl('', Validators.required),
      lastnames: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
    });
  }

  userForm: FormGroup;
  submitButton: string;
  usersTable = ['username', 'created_at', 'actions'];
  loading = true;

  // Para la paginacion
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  users = new MatTableDataSource<Element[]>();

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    try {
      var response: any = await this.userService.getUsers();
      if (response?.success) {
        this.loading = false;
        this.users.data = response.success;
        this.users.paginator = this.paginator;
      }
    } catch (error) {}
  }

  towNamesAndLastNames(flag) {
    var campos: any;
    var tipo: string;
    if (flag) {
      campos = this.userForm.get('names').value.split(' ');
      tipo = 'nombres';
    } else {
      campos = this.userForm.get('lastnames').value.split(' ');
      tipo = 'apellidos';
    }
    if (campos.length == 1) {
      alert(`Necesita dos ${tipo}`);
    } else if (campos.length >= 2) {
      if (campos[0].length > 0 && campos[1].length > 0) {
        var nombresYApellidos = {
          first: campos[0],
          second: campos[1],
        };
        return nombresYApellidos;
      } else {
        alert(`Necesita dos ${tipo}`);
      }
    }
  }

  async createUser() {
    if (this.userForm.valid) {
      var twoNames = this.towNamesAndLastNames(true);
      var twoLastNames = this.towNamesAndLastNames(false);
      if (twoNames && twoLastNames) {
        try {
          var response: any = await this.userService.createUser(
            this.userForm.get('username').value,
            this.userForm.get('password').value,
            this.userForm.get('document').value,
            twoNames.first,
            twoNames.second,
            twoLastNames.first,
            twoLastNames.second,
            this.userForm.get('mail').value
          );
          if (response?.success) {
            this.userForm.reset();
            this.getUsers();
          }
        } catch (error) {}
      }
    }
  }

  handleSubmit() {
    if (this.submitButton == 'edit') {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  deleteUser(id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          var response: any = await this.userService.deleteUser(id);
          if (response?.success) {
            this.getUsers();
          }
        } catch (error) {
          alert('Algo salió mal');
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }

  showUser(user) {
    var twoNames = user.PrimerNombre + ' ' + user.SegundoNombre;
    var twoLastNames = user.PrimerApellido + ' ' + user.SegundoApellido;
    this.userForm.setValue({
      userId: user.IdUsuario,
      personId: user.IdPersona,
      username: user.Usuario,
      password: '',
      document: user.CedulaIdentidad,
      names: twoNames,
      lastnames: twoLastNames,
      mail: user.Correo,
    });
    this.submitButton = 'edit';
  }

  async updateUser() {
    try {
      var twoNames = this.towNamesAndLastNames(true);
      var twoLastNames = this.towNamesAndLastNames(false);
      var response: any = await this.userService.updateUser(
        this.userForm.get('userId').value,
        this.userForm.get('personId').value,
        this.userForm.get('username').value,
        this.userForm.get('password').value,
        this.userForm.get('document').value,
        twoNames.first,
        twoNames.second,
        twoLastNames.first,
        twoLastNames.second,
        this.userForm.get('mail').value
      );
      if (response?.success) {
        this.userForm.reset();
        this.getUsers();
      }
    } catch (error) {}
  }
}
