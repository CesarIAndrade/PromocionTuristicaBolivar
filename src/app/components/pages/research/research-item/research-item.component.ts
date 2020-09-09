import { Component, OnInit, Input } from '@angular/core';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ResearchService } from 'src/app/services/research.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-research-item',
  templateUrl: './research-item.component.html',
  styleUrls: ['./research-item.component.css'],
})
export class ResearchItemComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private researchService: ResearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var names: string;
    this.research.Autores.map((author) => {
      this.authors += `${author.PrimerNombre} ${author.PrimerApellido} ${author.SegundoApellido}, `;
    });
    localStorage.getItem('token')
      ? (this.editResearch = true)
      : (this.editResearch = false);
  }

  @Input() research: any;
  authors = '';
  editResearch: boolean;

  deleteResearch(id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          var response: any = await this.researchService.deleteResearch(id);
          if (response?.success) {
            this.researchService.refresh$.emit();
          }
        } catch (error) {
          alert('Algo salió mal');
        }
      }
    });
  }

  updateResearch(id: string) {
    this.router.navigate(['/research-form', id]);
  }
}
