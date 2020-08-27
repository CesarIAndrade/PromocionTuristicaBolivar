import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonsModalComponent } from '../../persons/persons-modal/persons-modal.component';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-research-form',
  templateUrl: './research-form.component.html',
  styleUrls: ['./research-form.component.css'],
})
export class ResearchFormComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private personsService: PersonsService
  ) {}

  ngOnInit(): void {}

  addAuthors() {
    let dialogRef = this.dialog.open(PersonsModalComponent, {
      width: 'auto',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log(this.personsService.authors);
    });
  }
}
