import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { PostModel } from './post-model';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: PostModel[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(titleAdded: string, contentAdded: string) {
    const post: PostModel = {
      id: null,
      title: titleAdded,
      content: contentAdded
    };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
