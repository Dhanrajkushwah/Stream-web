import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  // Register User
  signup(obj: any): Observable<any> {
    return this._http.post<any>(`${environment._api}/api/user/signup`, obj);
  }

  // Login User
  login(obj: any): Observable<any> {
    return this._http.post<any>(`${environment._api}/api/user/login`, obj);
  }

  // Upload video
  uploadVideo(formData: FormData): Observable<any> {
    return this._http.post(`${environment._api}/api/videos/upload`, formData);
  }

  // Get list of videos
  getVideos(): Observable<any[]> {
    return this._http.get<any[]>(`${environment._api}/api/videos/list`);
  }

  // Stream video
  getVideoStreamUrl(filename: string): string {
    return `${environment._api}/api/videos/stream/${filename}`;
  }
}
