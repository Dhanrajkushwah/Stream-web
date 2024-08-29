import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  videoUrl!: SafeUrl;

  constructor(
    private route: ActivatedRoute,
    private videoService: LoginService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id')!;
  // this.videoService.getVideoById(id).subscribe((blob) => {
  //   const url = window.URL.createObjectURL(blob);
  //   this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  // });
  // }
}
}
  
