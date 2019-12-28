import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostModel } from './post-model';
import { TouchSequence } from 'selenium-webdriver';
import { PostCreateComponent } from './post-create/post-create.component';


@Injectable({
  providedIn: 'root'
})

export class PostService {

  private posts: PostModel[] = [];
  private postsUpdated = new Subject<{ posts: PostModel[], postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Request every album the actual user can see.
   *
   * @returns {Promise <any>}
   * @memberof PostService
   */
  getPosts(): Promise <any> {
    // const queryParams = `?userId=${userId}`;
    return this.http.get('http://localhost:3000/api/posts').toPromise();
  }

  /**
   * Request the album the user choose.
   *
   * @param {string} id
   * @returns {Promise<PostModel>}
   * @memberof PostService
   */
  getPost(id: string): Promise<any> {
    return this.http.get<{post: PostModel}>('http://localhost:3000/api/posts/'+ id).toPromise();
  }


  /**
   * Request to create a new album.
   *
   * @param {string} title
   * @param {*} images
   * @returns {Promise<any>}
   * @memberof AlbumsService
   */
  addPost(post: PostModel): Promise<any> {
    return this.http.post<{message: string, post: PostModel}>('http://localhost:3000/api/posts', post).toPromise();
  }

    /**
   * Request to update the album selectionned.
   *
   * @param {Album} album
   * @returns {Promise<any>}
   * @memberof AlbumsService
   */
  updatePost(post: PostModel): Promise<any> {
    return this.http.put('http://localhost:3000/api/posts/' + post.id, post).toPromise();
  }


    /**
   * Request to delete the album selectionned.
   *
   * @param {string} albumId
   * @returns {Promise<any>}
   * @memberof AlbumsService
   */
  deletePost(postId: string): Promise<any> {
    return this.http.delete('http://localhost:3000/api/posts/' + postId).toPromise();
  }
}
