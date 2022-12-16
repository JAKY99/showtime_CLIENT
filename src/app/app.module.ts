import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {AuthGuard} from "./auth.guard";
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {BlockUIModule} from "primeng/blockui";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {SlideMenuModule} from "primeng/slidemenu";
import {RippleModule} from "primeng/ripple";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {LogoComponent} from './components/logo/logo.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {CarouselModule} from "primeng/carousel";
import {SwiperModule} from 'swiper/angular';
import {CarouselImageListComponent} from './components/carousel-image-list/carousel-image-list.component';
import {NoConnectionComponent} from './components/no-connection/no-connection.component';
import {SkeletonModule} from "primeng/skeleton";
import {NavbarComponent} from './components/navbar/navbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MoviesPageComponent} from './pages/movies-page/movies-page.component';
import {TvPageComponent} from './pages/tv-page/tv-page.component';
import {SocialPageComponent} from './pages/social-page/social-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {MovieDetailsPageComponent} from './pages/movie-details-page/movie-details-page.component';
import {ImageComponent} from './components/image/image.component';
import {TagComponent} from './components/tag/tag.component';
import {DescriptionComponent} from './components/description/description.component';
import {CarouselActorsListComponent} from './components/carousel-actors-list/carousel-actors-list.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {WatchProvidersComponent} from './components/watch-providers/watch-providers.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {TabViewModule} from "primeng/tabview";
import {GoBackComponent} from './components/go-back/go-back.component';
import {TabMenuModule} from "primeng/tabmenu";
import {TvDetailsPageComponent} from './pages/tv-details-page/tv-details-page.component';
import {DialogModule} from 'primeng/dialog';
import {LazyImgDirective} from './lazy-img.directive';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {PosterImageComponent} from './components/poster-image/poster-image.component';
import {EpisodeCardComponent} from './components/episode-card/episode-card.component';
import {AccordionSeasonsComponent} from './components/accordion-seasons/accordion-seasons.component';
import {AccordionModule} from "primeng/accordion";
import {ProgressBarModule} from "primeng/progressbar";
import {ResetPasswordFormComponent} from './components/reset-password-form/reset-password-form.component';
import {ResetPageComponent} from './pages/reset-page/reset-page.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {ChangePasswordPageComponent} from './pages/change-password-page/change-password-page.component';
import {ChangePasswordFormComponent} from './components/change-password-form/change-password-form.component';
import {ProfileAvatarComponent} from './components/profile-avatar/profile-avatar.component';
import {ProfileTopSectionComponent} from './components/profile-top-section/profile-top-section.component';
import {ProfileSocialInfosComponent} from './components/profile-social-infos/profile-social-infos.component';
import {ProfileStatsCarouselComponent} from './components/profile-stats-carousel/profile-stats-carousel.component';
import {ProfileStatTimeComponent} from './components/profile-stat-time/profile-stat-time.component';
import {ProfileStatNumberComponent} from './components/profile-stat-number/profile-stat-number.component';
import {SearchTopDrawerComponent} from './components/search/search-top-drawer/search-top-drawer.component';
import {MainSearchComponent} from './components/search/main-search/main-search.component';
import { MainSearchPageComponent } from './pages/main-search-page/main-search-page.component';
import { PosterListComponent } from './components/poster-list/poster-list.component';
import { SortDrawerComponent } from './components/search/sort-drawer/sort-drawer.component';
import {RadioButtonModule} from "primeng/radiobutton";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ResetPasswordFormComponent,
    LoginPageComponent,
    ResetPageComponent,
    RegisterFormComponent,
    RegisterPageComponent,
    ResetPageComponent,
    ChangePasswordPageComponent,
    ChangePasswordFormComponent,
    HomePageComponent,
    LogoComponent,
    CarouselComponent,
    CarouselImageListComponent,
    NoConnectionComponent,
    NavbarComponent,
    MoviesPageComponent,
    TvPageComponent,
    SocialPageComponent,
    ProfilePageComponent,
    MovieDetailsPageComponent,
    ImageComponent,
    TagComponent,
    DescriptionComponent,
    CarouselActorsListComponent,
    WatchProvidersComponent,
    GoBackComponent,
    TvDetailsPageComponent,
    LazyImgDirective,
    PosterImageComponent,
    ProfileAvatarComponent,
    ProfileTopSectionComponent,
    ProfileSocialInfosComponent,
    ProfileStatsCarouselComponent,
    ProfileStatTimeComponent,
    ProfileStatNumberComponent,
    EpisodeCardComponent,
    AccordionSeasonsComponent,
    SearchTopDrawerComponent,
    MainSearchComponent,
    MainSearchPageComponent,
    PosterListComponent,
    SortDrawerComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SidebarModule,
        ButtonModule,
        MenubarModule,
        InputTextModule,
        CardModule,
        FormsModule,
        PasswordModule,
        DividerModule,
        ReactiveFormsModule,
        ToastModule,
        BlockUIModule,
        AvatarModule,
        BadgeModule,
        SlideMenuModule,
        RippleModule,
        BreadcrumbModule,
        TableModule,
        MultiSelectModule,
        CarouselModule,
        SwiperModule,
        SkeletonModule,
        FontAwesomeModule,
        ProgressSpinnerModule,
        AutoCompleteModule,
        DropdownModule,
        TabViewModule,
        TabMenuModule,
        DialogModule,
        LazyLoadImageModule,
        AccordionModule,
        ProgressBarModule,
        RadioButtonModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
      multi: true
    },
    HttpClientModule,
    MessageService,
    AuthGuard,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
