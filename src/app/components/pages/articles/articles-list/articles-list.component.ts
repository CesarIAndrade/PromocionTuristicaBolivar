import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ArticlesService } from 'src/app/services/articles.service';
import { imagesUrl } from 'src/environments/environment';

import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { AuthService } from 'src/app/services/auth.service';

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
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  articles: Article[] = [];
  addArticle: boolean;
  editArticleButton: boolean;
  acrticlesListClass = "col-xs-12 col-sm-12 col-md-4 col-lg-3";
  articlesToShow: number;

  ngOnInit(): void {

    if (!localStorage.getItem('token') || this.router.url == "/home") {
      this.getArticles('pListarNoticias', false);
      this.addArticle = false;
      this.editArticleButton = false;
    } else {
      this.getArticles('listarNoticias', true);
      this.addArticle = true;
      this.editArticleButton = true;
    }

    this.articleService.refresh$.subscribe(() => {
      this.getArticles('listarNoticias', true);
    });
    this.authService.autenticated$.subscribe(() => {
      this.getArticles('pListarNoticias', false);
      this.addArticle = false;
      this.editArticleButton = false;
    });
  }

  async getArticles(url, autenticated) {
    var response: any = await this.articleService.getArticles(
      url,
      autenticated
    );
    if (response?.success) {
      var temp_articles: Article[] = [];
      response.success.map((article: Article) => {
        article.ImagenTitulo = imagesUrl + article.ImagenTitulo;
        temp_articles.push(article);
      });
      this.articles = temp_articles;
      this.articlesToShow = this.articles.length;
      if(this.router.url == "/home") {
        this.acrticlesListClass = "col-xs-12 col-sm-12 col-md-4 col-lg-4";
        this.articlesToShow = 3;
      }
    }
  }

  createArticle() {
    this.router.navigateByUrl('/article-form');
  }

  editArticle(id: number) {
    this.router.navigateByUrl(`/article-form/${id}`);
  }

  goToArticle(id: number) {
    this.router.navigateByUrl(`/acticle-details/${id}`);
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
            this.getArticles('listarNoticias', true);
          }
        } catch (error) {
          alert('Algo salió mal');
        }
      }
    });
  }

  async changeState(id, state) {
    if (localStorage.getItem('userType') != '2') {
      let dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '250px',
        height: 'auto',
      });
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          try {
            var response: any = await this.articleService.changeState(
              id,
              state
            );
            if (response?.success) {
              this.getArticles('listarNoticias', true);
            }
          } catch (error) {
            alert('Algo salió mal');
          }
        }
      });
    }
  }
}
