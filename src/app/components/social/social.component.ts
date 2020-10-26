import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  socialNetworks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com',
      icon: 'https://img.icons8.com/material/24/000000/facebook-new.png'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'https://img.icons8.com/material/24/000000/twitter-squared.png'
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com',
      icon: 'https://img.icons8.com/material/24/000000/youtube-play--v1.png'
    }
  ];

}
