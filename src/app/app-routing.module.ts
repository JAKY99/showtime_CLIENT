import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ResetPageComponent} from "./pages/reset-page/reset-page.component";
import {AuthGuard} from "./auth.guard";
import {MoviesPageComponent} from "./pages/movies-page/movies-page.component";
import {TvPageComponent} from "./pages/tv-page/tv-page.component";
import {SocialPageComponent} from "./pages/social-page/social-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {MovieDetailsPageComponent} from "./pages/movie-details-page/movie-details-page.component";
import {TvDetailsPageComponent} from "./pages/tv-details-page/tv-details-page.component";
import{RegisterPageComponent} from "./pages/register-page/register-page.component";
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import {MainSearchPageComponent} from "./pages/main-search-page/main-search-page.component";
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'reset', component: ResetPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'reset-password/:token', component: ChangePasswordPageComponent},
  {
    path: 'home',
    children:[
      {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path:'movies',
    component: MoviesPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'series',
    component: TvPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'social',
    component: SocialPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'movie/:id',
    component: MovieDetailsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'tv/:id',
    component: TvDetailsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'search',
    component: MainSearchPageComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
