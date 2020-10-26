import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { imagesUrl } from 'src/environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  constructor(private userSvcService: UsersService) {}

  ngOnInit(): void {
    this.getImages();
  }

  images: any[] = [];
  defaultImage: string;

  getImages() {
    this.userSvcService
      .getImages()
      .then((response: any) => {
        if (response?.success) {
          response.success.map((image: any) => {
            this.images.push(imagesUrl + image);
          });
          this.defaultImage = this.images[0];
          this.images.shift();
        }
      })
      .catch((err) => console.log(err));
  }
}
