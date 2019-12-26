import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/overlay/typings/overlay-directives';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: PostModel[] = [];
  private postsSub: Subscription;

  // paginator variables
  currentPage = 1;
  totalPosts: number;
  postsPerPage = 3;
  pageSizeOptions = [ 1, 2, 3, 5, 10 ];

  isLoading = false;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService
                      .getPostsUpdateListener()
                      .subscribe((postData: {posts: PostModel[], postCount: number}) => {
                        this.isLoading = false;
                        this.totalPosts = postData.postCount;
                        this.posts = postData.posts;
                      });

  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postService
      .deletePost(id)
      .subscribe(() => {
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
