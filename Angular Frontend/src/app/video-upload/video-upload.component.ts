import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent {
  videos: any[] = [];
  videoSrc: string | null = null;
  
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  onVideoUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('video', file);
      this.loginService.uploadVideo(formData).subscribe(() => {
        this.loadVideos(); // Reload the list after upload
      });
    }
  }

  loadVideos(): void {
    this.loginService.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

  onVideoSelect(filename: string): void {
    this.videoSrc = this.loginService.getVideoStreamUrl(filename);
    this.videoPlayer.nativeElement.load(); // Load the selected video in the player
  }
}