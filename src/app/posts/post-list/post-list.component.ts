import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostModel } from '../post-model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: PostModel[] = [];
  private postsSub: Subscription;

  isLoading = false;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService.getPostsUpdateListener()
      .subscribe((posts: PostModel[]) => {
        this.posts = posts;
      });
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
    // console.log('onDelete function ', id);
  }

}
