import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomended-articles',
  templateUrl: './recomended-articles.component.html',
  styleUrls: ['./recomended-articles.component.css']
})
export class RecomendedArticlesComponent implements OnInit {

  constructor(
    private articleService: ArticlesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.getArticles('listarNoticias', true);
    } else {
      this.getArticles('pListarNoticias', false);
    }
  }

  articles: any[] = [];

  async getArticles(url, autenticated) {
    var response: any = await this.articleService.getArticles(url, autenticated);
    if (response?.success) {
      this.articles = response.success;
    }
  }

  goToArticle(id: number) {
    this.router.navigateByUrl(`/acticle-details/${id}`);
  }

}
