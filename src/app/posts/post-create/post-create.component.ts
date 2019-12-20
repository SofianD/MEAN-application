import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { ActivatedRoute, ParamMap } from '@angular/router';
import { StringifyOptions } from 'querystring';

import { PostService } from '../post.service';
import { PostModel } from '../post-model';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

  enteredTitle: string;
  enteredContent: string;
  post: PostModel;
  isLoading = false;
  private mode = 'create';
  private postId: string;



  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId)
          .subscribe((postData) => {
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content
            };
          });
        this.isLoading = false;
      }
    });
  }

  onSavePost(form: NgForm) {

    if (form.invalid) {
      return console.log('Formulaire invalide');
    }

    this.isLoading = true;

    if (this.mode === 'create') {
      console.log('onSavePost Create');
      this.postService.addPost(form.value.title, form.value.content);
    }

    if (this.mode === 'edit') {
      console.log('onSavePost Edit: ');
      console.log('this.postId: ', this.postId);
      console.log('this.mode: ', this.mode);
      console.log('form.value.title', form.value.title);
      console.log('form.value.content', form.value.content);

      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
  }


}
