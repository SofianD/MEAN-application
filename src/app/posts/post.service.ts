import { Injectable } from '@angular/core';
import { Post } from './post';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };


  constructor(
    private http: HttpClient
  ) { }


}
