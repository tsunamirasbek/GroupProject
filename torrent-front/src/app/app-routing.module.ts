import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',redirectTo:'/main-page',pathMatch:'full'},
  {path: 'main-page', component: MainPageComponent, children: [
    {path: ':id', component: GameComponent}
  ]},
  {path: 'games/:id', component: GameDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
