import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

// Define an interface for a Video if needed
interface Video {
  filename: string;
  uploadDate: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(private videoService: LoginService) {}

  ngOnInit(): void {
  //   this.videoService.getVideos().subscribe((data: Video[]) => {
  //     this.videos = data;
  //   }, error => {
  //     console.error('Error fetching videos', error);
  //   });
  // }
  }
}
