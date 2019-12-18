import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.http
      .get<{message: string, posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
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

    this.http
      .post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted');
        const postsUpdated = this.posts.filter(post => post.id !== postId);
        this.posts = postsUpdated;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
