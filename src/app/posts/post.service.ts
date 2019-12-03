import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(titleAdded: string, contentAdded: string) {
    const post: PostModel = {
      title: titleAdded,
      content: contentAdded
    };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
  constructor() { }
}
