import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './views/home/home.module#HomePageModule' },
  { path: 'home/:success', loadChildren: './views/home/home.module#HomePageModule'},
  { path: 'category/:category/:page', loadChildren: './views/category/category.module#CategoryPageModule'},
  { path: 'login-in', loadChildren: './views/login-in/login-in.module#LoginInPageModule' },
  { path: 'register', loadChildren: './views/register/register.module#RegisterPageModule' },
  { path: 'account', loadChildren: './views/account/account.module#AccountPageModule' },
  { path: 'question-submit', loadChildren: './views/question-submit/question-submit.module#QuestionSubmitPageModule' },
  { path: 'questionView/:questionId', loadChildren: './views/question-view/question-view.module#QuestionViewPageModule' },
  { path: 'profile', loadChildren: './views/profile/profile.module#ProfilePageModule' },
  { path: 'update-profile', loadChildren: './views/update-profile/update-profile.module#UpdateProfilePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
