import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { imagesUrl } from 'src/environments/environment';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  constructor(
    private articleService: ArticlesService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.getArticle(params.get('id'));
      }
    });
  }

  article = {
    title: '',
    description: '',
    shortDescription: '',
    created_at: '',
    imageUrl: '',
    author: '',
  }

  async getArticle(id: string) {
    var response: any = await this.articleService.getArticle(id, 'pBuscarNoticia');
    if (response?.success) {
      const {
        Descripcion,
        DescripcionCorta,
        ImagenTitulo,
        FechaActualizacion,
        Titulo,
        Persona
      } = response.success;
      var author = `${Persona.PrimerNombre} ${Persona.PrimerApellido} ${Persona.SegundoApellido}`
      this.article = {
        title: Titulo,
        description: Descripcion,
        shortDescription: DescripcionCorta,
        created_at: FechaActualizacion,
        imageUrl: imagesUrl+ImagenTitulo,
        author: author
      }
      
    }
  }
}
