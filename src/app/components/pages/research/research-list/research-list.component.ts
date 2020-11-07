import { Component, OnInit } from '@angular/core';
import { ResearchService } from 'src/app/services/research.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-research-list',
  templateUrl: './research-list.component.html',
  styleUrls: ['./research-list.component.css'],
})
export class ResearchListComponent implements OnInit {
  constructor(
    private researchService: ResearchService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getResearchList();
    if (!localStorage.getItem('token') || this.router.url == '/home') {
      this.searchBarClass = 'col-lg-12 col-md-12';
      this.addResearch = false;
    } else {
      this.searchBarClass = 'col-lg-10 col-md-9';
      this.addResearch = true;
    }
    this.researchService.refresh$.subscribe(() => {
      this.getResearchList();
    });
    this.authService.autenticated$.subscribe(() => {
      this.searchBarClass = 'col-lg-12 col-md-12';
      this.addResearch = false;
    });
  }

  researchList: any[] = [];
  researchListBefore: any[] = [];
  searchBarClass: string;
  addResearch: boolean;

  async getResearchList() {
    var response: any = await this.researchService.getResearchList();
    if (response?.success) {
      this.researchList = response.success;
      this.researchListBefore = this.researchList;
    }
  }

  goToAddResearch() {
    this.router.navigateByUrl('/research-form');
  }

  searchResearch(event) {
    if (event == '') {
      this.researchList = this.researchListBefore;
    } else {
      var newResearchList = this.researchList.filter((research) =>
        research.TituloPublicacion.toLowerCase().match(event)
      );
      this.researchList = newResearchList;
    }
  }
}
