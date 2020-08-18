import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ArticlesService } from 'src/app/services/articles.service';
import { imagesUrl } from 'src/environments/environment';

import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

export interface Article {
  Descripcion: string;
  DescripcionCorta: string;
  EstadoPublicacion: string;
  FechaActualizacion: string;
  FechaCreacion: string;
  IdNoticia: string;
  ImagenTitulo: string;
  Titulo: string;
}

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit {
  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  articles: Article[] = [];

  ngOnInit(): void {
    this.getArticles();
    this.articleService.refresh$.subscribe(() => {
      this.getArticles();
    });
  }

  async getArticles() {
    var response: any = await this.articleService.getArticles();
    if (response?.success) {
      var temp_articles: Article[] = [];
      response.success.map((article: Article) => {
        article.ImagenTitulo = imagesUrl + article.ImagenTitulo;
        temp_articles.push(article);
      });
      this.articles = temp_articles;
    }
  }

  createArticle() {
    this.router.navigateByUrl('/article-form');
  }

  editArticle(id: number) {
    this.router.navigateByUrl(`/article-form/${id}`);
  }

  deleteArticle(id: string) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          var response: any = await this.articleService.deleteArticle(id);
          if (response?.success) {
            this.getArticles();
          }
        } catch (error) {
          alert('Algo salió mal');
        }
      }
    });
  }

  async changeState(id, state) {
    let dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          var response: any = await this.articleService.changeState(id, state);
          if (response?.success) {
            this.getArticles();
          }
        } catch (error) {
          alert('Algo salió mal');
        }
      }
    });
  }
}
