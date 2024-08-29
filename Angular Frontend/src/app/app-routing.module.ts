import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signupform', component: RegisterComponent },
  { path: 'loginform', component: LoginComponent },
  { path: '', redirectTo: '/loginform', pathMatch: 'full' },
  { path: 'upload', component: VideoUploadComponent },
  { path: 'video/:id', component: VideoPlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
