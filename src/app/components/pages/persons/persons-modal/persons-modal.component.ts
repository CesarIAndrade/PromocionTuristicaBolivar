import { Component, OnInit } from '@angular/core';
import { PersonsService } from 'src/app/services/persons.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-persons-modal',
  templateUrl: './persons-modal.component.html',
  styleUrls: ['./persons-modal.component.css'],
})
export class PersonsModalComponent implements OnInit {
  constructor(
    private personsService: PersonsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void { }

  getAuthors() {
    this.personsService.refresh$.emit();
    this.dialog.closeAll();
  }
}
