import { Component, OnInit } from '@angular/core';
import { ResearchService } from 'src/app/services/research.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-research-list',
  templateUrl: './research-list.component.html',
  styleUrls: ['./research-list.component.css'],
})
export class ResearchListComponent implements OnInit {
  constructor(
    private researchSvc: ResearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getResearchList();
    if(localStorage.getItem('token')) {
      this.searchBarClass  = 'col-lg-10';
      this.menu = true;
    } else {
      this.searchBarClass  = 'col-lg-12';
      this.menu = false;
    }
  }

  researchList: any[] = [];

  searchBarClass: string;
  menu: boolean;

  async getResearchList() {
    var response: any = await this.researchSvc.getResearchList();
    console.log(response);
    if (response?.success) {
      this.researchList = response.success;
    }
  }

  goToAddResearch() {
    this.router.navigateByUrl('/research-form');
  }
}
