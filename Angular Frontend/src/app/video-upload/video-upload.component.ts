import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

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
      this.loginService.uploadVideo(formData).subscribe(
        () => {
          this.loadVideos();
          Swal.fire({
            icon: 'success',
            title: 'Upload Successful',
            text: 'Your video has been uploaded successfully!',
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'There was an error uploading your video. Please try again.',
          });
        }
      );
    }
  }

  loadVideos(): void {
    this.loginService.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

  onVideoSelect(filename: string): void {
    this.videoSrc = this.loginService.getVideoStreamUrl(filename);
    this.videoPlayer.nativeElement.load();
    
    Swal.fire({
      icon: 'info',
      title: 'Video Selected',
      text: 'The video is now loading...',
      timer: 1500,
      showConfirmButton: false
    });
  }
}
