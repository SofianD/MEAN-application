import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { NotConnectedGuard } from './auth/alreadyConnect-guard';

const routes = [
  { path: '', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotConnectedGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NotConnectedGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    NotConnectedGuard
  ]
})

export class AppRoutingModule {

}
