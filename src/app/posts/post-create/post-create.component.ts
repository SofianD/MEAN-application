import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostModel } from '../post-model';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {

  enteredTitle: string;
  enteredContent: string;

  @Output() postCreated = new EventEmitter<PostModel>();

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return console.log('Formulaire invalide');
    }
    const post: PostModel = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);
  }
}
