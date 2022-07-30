import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../interfaces/photo';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoBoardService {
  constructor(private http : HttpClient) {
    console.log(``)
  }

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3000/photos');
  }
}
