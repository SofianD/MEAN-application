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
    this.Initialize();
  }

async Initialize(): Promise<void> {
  this.isLoading = true;

  if (this.route.snapshot.params.postId) {
    this.mode = 'edit';
    this.postId = this.route.snapshot.params.postId;
  }

  try {
    this.post = await this.postService.getPost(this.postId)
    this.form.setValue({
      title: this.post.title,
      content: this.post.content,
      image: this.post.imagePath
    });
    this.imagePreview = this.form.get('image').value;

  } catch (e) {
    console.error(e);
  }

  this.isLoading = false;
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

    /**
   * Function called to create or edit a Post.
   * Set loading on true,
   * Check the form,
   * Save the post and redirect,
   * Reset the form and set loading on false (in case of error),
   *
   * @returns {Promise<void>}
   * @memberof AlbumCreateComponent
   */
  async savePost(): Promise<void> {

    if (this.form.invalid) {
      return console.log('Formulaire invalide');
    }

    this.isLoading = true;

    this.post = this.form.value;

    if (this.mode === 'create') {
      console.log('onSavePost Create');
      try {
        this.postService.addPost(this.post);
      } catch (e) {
        console.error(e);
      }
    }

    if (this.mode === 'edit') {
      try {
        this.postService.updatePost(this.post);
      } catch (e) {
        console.error(e);
      }
    }

    this.form.reset();
  }
}
