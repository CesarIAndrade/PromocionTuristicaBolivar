import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-persons-form',
  templateUrl: './persons-form.component.html',
  styleUrls: ['./persons-form.component.css'],
})
export class PersonsFormComponent implements OnInit {
  constructor(
    private personsService: PersonsService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.authors = this.data.authors;
    }
    this.personForm = new FormGroup({
      personId: new FormControl(''),
      document: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[0-9]\d*)?$/),
      ]),
      names: new FormControl('', Validators.required),
      lastnames: new FormControl('', Validators.required),
      mail: new FormControl('', Validators.required),
    });
  }

  personForm: FormGroup;
  submitButton: string;
  personsTable = ['names', 'mail', 'actions'];
  loading = true;
  selectedAuthor = 'No';

  // Para la paginacion
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  persons = new MatTableDataSource<Element[]>();

  ngOnInit(): void {
    this.getPersons();
    this.personsService.refresh$.subscribe(() => {
      this.personsService.authors = this.authors;
    });
  }

  async getPersons() {
    var response: any = await this.personsService.getPersons();
    if (response?.success) {
      this.loading = false;
      response.success.map((item) => {
        if (this.authors.includes(item.IdPersona)) {
          item.selected = 'Si';
          item.checked = true;
        } else {
          item.selected = 'No';
          item.checked = false;
        }
        item.names = `${item.PrimerNombre} ${item.SegundoNombre} ${item.PrimerApellido} ${item.SegundoApellido}`;
      });
      this.persons.data = response.success;
      this.persons.paginator = this.paginator;
    }
  }

  towNamesAndLastNames(flag) {
    var campos: any;
    var tipo: string;
    if (flag) {
      campos = this.personForm.get('names').value.split(' ');
      tipo = 'nombres';
    } else {
      campos = this.personForm.get('lastnames').value.split(' ');
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

  async createPerson() {
    if (this.personForm.valid) {
      var twoNames = this.towNamesAndLastNames(true);
      var twoLastNames = this.towNamesAndLastNames(false);
      if (twoNames && twoLastNames) {
        try {
          var response: any = await this.personsService.createPerson(
            this.personForm.get('document').value,
            twoNames.first,
            twoNames.second,
            twoLastNames.first,
            twoLastNames.second,
            this.personForm.get('mail').value
          );
          if (response?.success) {
            this.personForm.reset();
            this.getPersons();
          }
        } catch (error) {}
      }
    }
  }

  handleSubmit() {
    if (this.submitButton == 'edit') {
      this.updatePerson();
    } else {
      this.createPerson();
    }
  }

  deletePerson(id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          var response: any = await this.personsService.deletePerson(id);
          if (response?.success) {
            this.getPersons();
          }
        } catch (error) {
          alert('Algo salió mal');
        }
      }
    });
  }

  goBack() {
    this.dialog.closeAll();
  }

  showPerson(user) {
    var twoNames = user.PrimerNombre + ' ' + user.SegundoNombre;
    var twoLastNames = user.PrimerApellido + ' ' + user.SegundoApellido;
    this.personForm.setValue({
      personId: user.IdPersona,
      document: user.CedulaIdentidad,
      names: twoNames,
      lastnames: twoLastNames,
      mail: user.Correo,
    });
    this.submitButton = 'edit';
  }

  async updatePerson() {
    try {
      var twoNames = this.towNamesAndLastNames(true);
      var twoLastNames = this.towNamesAndLastNames(false);
      var response: any = await this.personsService.updatePerson(
        this.personForm.get('personId').value,
        this.personForm.get('document').value,
        twoNames.first,
        twoNames.second,
        twoLastNames.first,
        twoLastNames.second,
        this.personForm.get('mail').value
      );
      if (response?.success) {
        this.personForm.reset();
        this.getPersons();
      }
    } catch (error) {}
  }

  authors: any[] = [];

  selectAuthor(person, event) {
    if (event.target.checked) {
      this.authors.push(person.IdPersona);
      person.selected = 'Si';
      person.checked = true;
    } else {
      var index = this.authors.indexOf(person.IdPersona);
      this.authors = this.authors.splice(index, 1);
      person.selected = 'No';
      person.checked = false;
    }

    // if (event.target.checked) {
    //   if (!this.authors.includes(person.IdPersona)) {
    //     this.authors.push(person.IdPersona);
    //     person.selected = 'Si';
    //   }
    // } else {
    //   if (this.authors.includes(person.IdPersona)) {
    //     var author = this.authors.find(
    //       (author) => author.IdPersona === person.IdPersona
    //     );
    //     var index = this.authors.indexOf(author);
    //     this.authors.splice(index, 1);
    //     person.selected = 'No';
    //   }
    // }
  }
}
