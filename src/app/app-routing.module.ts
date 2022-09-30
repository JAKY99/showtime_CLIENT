import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./auth.guard";
import {MoviesPageComponent} from "./pages/movies-page/movies-page.component";
import {SeriesPageComponent} from "./pages/series-page/series-page.component";
import {SocialPageComponent} from "./pages/social-page/social-page.component";
import {ProfilPageComponent} from "./pages/profil-page/profil-page.component";
import {MovieDetailsPageComponent} from "./pages/movie-details-page/movie-details-page.component";
import {TvDetailsPageComponent} from "./pages/tv-details-page/tv-details-page.component";
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
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
    component: SeriesPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'social',
    component: SocialPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'profil',
    component: ProfilPageComponent,
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
    //canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
