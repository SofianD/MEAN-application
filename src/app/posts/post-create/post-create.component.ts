import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {

  enteredTitle: string;
  enteredContent: string;

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return console.log('Formulaire invalide');
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  constructor(public postService: PostService) {}
}
