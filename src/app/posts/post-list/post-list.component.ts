import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: PostModel[] = [];
  private postsSub: Subscription;

  userIsAuthenticated = false;
  authListnerSubs: Subscription;

  userId: string;

  isLoading = false;

  currentPage = 1;
  totalPosts: number;
  postsPerPage = 10;
  pageSizeOptions = [ 1, 2, 3, 5, 10 ];


  constructor(public postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postService
                      .getPostsUpdateListener()
                      .subscribe((postData: {posts: PostModel[], postCount: number}) => {
                        this.isLoading = false;
                        this.totalPosts = postData.postCount;
                        this.posts = postData.posts;
                      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService
                                .getAuthStatusListener()
                                .subscribe(isAuthenticated => {
                                  this.userIsAuthenticated = isAuthenticated;
                                  this.userId = this.authService.getUserId();

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
    this.authListnerSubs.unsubscribe();
  }
}
