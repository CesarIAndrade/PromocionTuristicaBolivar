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
    if(localStorage.getItem('token')) {
      this.searchBarClass  = 'col-lg-10 col-md-9';
      this.addResearch = true;
    } else {
      this.searchBarClass  = 'col-lg-12 col-md-12';
      this.addResearch = false;
    }
    this.researchService.refresh$.subscribe(() => {
      this.getResearchList();
    })
    this.authService.autenticated$.subscribe(() => {
      this.searchBarClass  = 'col-lg-12 col-md-12';
      this.addResearch = false;
    })

  }

  researchList: any[] = [];

  searchBarClass: string;
  addResearch: boolean;

  async getResearchList() {
    var response: any = await this.researchService.getResearchList();
    console.log(response);
    if (response?.success) {
      this.researchList = response.success;
    }
  }

  goToAddResearch() {
    this.router.navigateByUrl('/research-form');
  }
}
