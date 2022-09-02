import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./auth.guard";
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {
    path: 'home',
    children:[
      {
        path: '',
        component: HomePageComponent,
        //canActivate: [AuthGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
