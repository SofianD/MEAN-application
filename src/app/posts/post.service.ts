import { Injectable } from '@angular/core';

import { PostModel } from './post-model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: PostModel[] = [];

  getPosts() {
    return [...this.posts];
  }

  addPost(titleAdded: string, contentAdded: string) {
    const post: PostModel = {
      title: titleAdded,
      content: contentAdded
    };
    this.posts.push(post);
  }
  constructor() { }
}
