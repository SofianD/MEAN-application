import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StringifyOptions } from 'querystring';

import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {


  post: PostModel;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;



  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.minLength(3)
        ]}
      ),
      content: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.minLength(3)
          ]
        }
      ),
      image: new FormControl(
        null,
        {
          validators:
          [
            Validators.required
          ],
          asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          });
          this.imagePreview = this.form.get('image').value;
        });

        this.isLoading = false;
      }
    });
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {

    if (this.form.invalid) {
      return console.log('Formulaire invalide');
    }

    this.isLoading = true;

    if (this.mode === 'create') {
      console.log('onSavePost Create');
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    }

    if (this.mode === 'edit') {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
