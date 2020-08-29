import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonsModalComponent } from '../../persons/persons-modal/persons-modal.component';
import { PersonsService } from 'src/app/services/persons.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResearchService } from 'src/app/services/research.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-research-form',
  templateUrl: './research-form.component.html',
  styleUrls: ['./research-form.component.css'],
})
export class ResearchFormComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private personsService: PersonsService,
    private researchService: ResearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.researchForm = new FormGroup({
      researchId: new FormControl(''),
      researchTitle: new FormControl('', Validators.required),
      researchLink: new FormControl('', Validators.required),
      researchPubDate: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params) {
        if (params.get('id') != null) {
          this.getResearch(params.get('id'));
          this.submitButton = 'edit';
        }
      }
    });    
  }

  researchForm: FormGroup;
  authors: any[] = [];
  submitButton: string;

  addAuthors() {
    let dialogRef = this.dialog.open(PersonsModalComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        authors: this.authors,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.authors = this.personsService.authors;
    });
  }

  handleSubmit() {
    if (this.submitButton == 'edit') {
      this.updateResearch();
    } else {
      this.addResearch();
    }
  }

  async addResearch() {
    if (this.researchForm.valid) {
      try {
        var researchPubDate = this.researchForm
          .get('researchPubDate')
          .value.toJSON()
          .split('T')[0];
        var response: any = await this.researchService.addResearch(
          this.researchForm.get('researchTitle').value,
          this.researchForm.get('researchLink').value,
          researchPubDate,
          this.authors
        );
        if (response?.success) {
          this.router.navigateByUrl('/research-list');
        }
      } catch (error) {
        alert('Te faltan los autores');
      }
    }
  }

  async getResearch(id: string) {
    var response: any = await this.researchService.getResearch(id);
    if (response?.success) {
      const {
        EnlacePublicacion,
        FechaPublicacion,
        IdPublicacion,
        TituloPublicacion,
        Autores,
      } = response.success;
      this.researchForm.setValue({
        researchId: IdPublicacion,
        researchTitle: TituloPublicacion,
        researchLink: EnlacePublicacion,
        researchPubDate: FechaPublicacion,
      });
      Autores.map((author) => {
        this.authors.push(author.IdPersona)
      })      
    }
  }

  async updateResearch() {
    if (this.researchForm.valid) {
      try {
        try {
          var researchPubDate = this.researchForm
            .get('researchPubDate')
            .value.toJSON()
            .split('T')[0];
        } catch (error) {
          var researchPubDate = this.researchForm.get('researchPubDate').value;
        }

        var response: any = await this.researchService.updateResearch(
          this.researchForm.get('researchId').value,
          this.researchForm.get('researchTitle').value,
          this.researchForm.get('researchLink').value,
          researchPubDate,
          this.authors
        );

        if (response?.success) {
          this.router.navigateByUrl('/research-list');
        }
      } catch (error) {
        // alert('Te faltan los autores');
        console.log(error);
      }
    }
  }
}
