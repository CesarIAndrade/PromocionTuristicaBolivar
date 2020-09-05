import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticlesService } from 'src/app/services/articles.service';
import { imagesUrl } from 'src/environments/environment';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent implements OnInit {
  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private location: Location,
    private activedRoute: ActivatedRoute
  ) {
    this.articleForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      shortDescription: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  articleForm: FormGroup;
  imageSelected: string | ArrayBuffer;
  image: File;
  submitButton: string;
  action = 'Guardar';

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.getArticle(params.get('id'));
      }
    });
  }

  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSelected = reader.result);
      reader.readAsDataURL(this.image);
    }
  }

  async createArticle() {
    if (this.image) {
      try {
        var response: any = await this.articleService.createArticle(
          this.articleForm.get('title').value,
          this.articleForm.get('shortDescription').value,
          this.articleForm.get('description').value,
          this.image
        );
        if (response?.success) {
          this.articleService.refresh$.emit();
          this.router.navigate(['/articles-list']);
        }
      } catch (error) {
        alert('Algo salió mal');
      }
    }
  }

  async getArticle(id: string) {
    var response: any = await this.articleService.getArticle(id, 'buscarNoticia');
    if (response?.success) {
      const {
        Descripcion,
        DescripcionCorta,
        IdNoticia,
        ImagenTitulo,
        Titulo,
      } = response.success;
      this.articleForm.get('id').setValue(IdNoticia);
      this.articleForm.get('title').setValue(Titulo);
      DescripcionCorta
        ? this.articleForm.get('shortDescription').setValue(DescripcionCorta)
        : this.articleForm
            .get('shortDescription')
            .setValue('Sin Descripción Corta');
      this.articleForm.get('description').setValue(Descripcion);
      this.imageSelected = imagesUrl + ImagenTitulo;
      this.submitButton = 'edit';
      this.action = 'Modificar';
    }
  }

  async editArticle() {
    try {
      var response: any = await this.articleService.editArticle(
        this.articleForm.get('id').value,
        this.articleForm.get('title').value,
        this.articleForm.get('shortDescription').value,
        this.articleForm.get('description').value,
        this.image
      );
      if (response?.success) {
        this.articleService.refresh$.emit();
        this.router.navigate(['/articles-list']);
        this.submitButton = null;
        this.action = 'Guardar';
      }
    } catch (error) {
      alert('Algo salió mal');
    }
  }

  handleSubmit() {
    if (this.submitButton == 'edit') {
      this.editArticle();
    } else {
      this.createArticle();
    }
  }

  goBack() {
    this.location.back();
  }
}
