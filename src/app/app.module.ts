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
import {MovieDetailComponent} from './components/movie-details/movie-detail.component';
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
import {TvDetailsComponent} from './components/tv-details/tv-details.component';
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
import {MainSearchPageComponent} from './pages/main-search-page/main-search-page.component';
import {PosterListComponent} from './components/poster-list/poster-list.component';
import {SortDrawerComponent} from './components/search/sort-drawer/sort-drawer.component';
import {RadioButtonModule} from "primeng/radiobutton";
import {MediaDetailsDialogComponent} from './components/media-details-dialog/media-details-dialog.component';
import { ViewAllProfileListComponent } from './components/view-all-profile-list/view-all-profile-list.component';
import { CarouselGenresComponent } from './components/carousel-genres/carousel-genres.component';
import { PrivacyPageComponent } from './pages/privacy-page/privacy-page.component';
import {ContextMenuModule} from "primeng/contextmenu";
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { SocialTopSectionComponent } from './components/social-top-section/social-top-section.component';
import { SocialInfoSectionComponent } from './components/social-info-section/social-info-section.component';
import { SocialUserDetailComponent } from './components/social-user-detail/social-user-detail.component';
import {StepsModule} from "primeng/steps";
import { RecommendedMediaDialogComponent } from './components/recommended-media-dialog/recommended-media-dialog.component';
import { RecommendedMediaComponent } from './components/recommended-media/recommended-media.component';
import {MenuModule} from "primeng/menu";
import {ListboxModule} from "primeng/listbox";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {SpeedDialModule} from "primeng/speeddial";
import { AddCommentDialogComponent } from './components/comment/add-comment-dialog/add-comment-dialog.component';
import { AddCommentComponent } from './components/comment/add-comment/add-comment.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import { CommentComponent } from './components/comment/comment/comment.component';
import { CommentAvatarComponent } from './components/comment/comment-avatar/comment-avatar.component';
import { ActorDetailsDialogComponent } from './components/actor/actor-details-dialog/actor-details-dialog.component';
import { ActorDetailsComponent } from './components/actor/actor-details/actor-details.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";
import { ResponseCommentComponent } from './components/comment/response-comment/response-comment.component';
import { CommentResponseComponent } from './components/comment/comment-response/comment-response.component';
import { NotificationIconComponent } from './components/notification-icon/notification-icon.component';
import { SeenCheckComponent } from './components/seen-check/seen-check.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { HeaderAvatarComponent } from './components/header-avatar/header-avatar.component';
import { NotificationFeedDialogComponent } from './components/notification-feed-dialog/notification-feed-dialog.component';
import {ToolbarModule} from "primeng/toolbar";
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditProfileDialogComponent } from './components/edit-profile/edit-profile-dialog/edit-profile-dialog.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile/edit-profile.component';
import {InplaceModule} from "primeng/inplace";
import { PictureCropDialogComponent } from './components/edit-profile/picture-crop-dialog/picture-crop-dialog.component';
import {FileUploadModule} from "primeng/fileupload";
import {HammerModule} from "@angular/platform-browser";
import { WebSidebarComponent } from './components/web/desktop-sidebar/web-sidebar.component';
import { DesktopBackdropCardComponent } from './components/web/desktop-backdrop-card/desktop-backdrop-card.component';
import { DesktopCarouselComponent } from './components/web/desktop-carousel/desktop-carousel.component';
import { DesktopMovieDetailsComponent } from './components/web/desktop-movie-details/desktop-movie-details.component'
import {ScrollPanelModule} from "primeng/scrollpanel";
import { DesktopTvDetailsComponent } from './components/web/desktop-tv-details/desktop-tv-details.component';
import {Page404Component} from "./pages/page404/page404.component";
import { SlideToggleButtonComponent } from './components/slide-toggle-button/slide-toggle-button.component';
import { TrophyCardComponent } from './components/trophy-card/trophy-card.component';


@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
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
    MovieDetailComponent,
    ImageComponent,
    TagComponent,
    DescriptionComponent,
    CarouselActorsListComponent,
    WatchProvidersComponent,
    GoBackComponent,
    TvDetailsComponent,
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
    MediaDetailsDialogComponent,
    ViewAllProfileListComponent,
    CarouselGenresComponent,
    ViewAllProfileListComponent,
    PrivacyPageComponent,
    SocialTopSectionComponent,
    SocialInfoSectionComponent,
    SocialUserDetailComponent,
    SocialInfoSectionComponent,
    RecommendedMediaDialogComponent,
    RecommendedMediaComponent,
    AddCommentDialogComponent,
    AddCommentComponent,
    CommentComponent,
    CommentAvatarComponent,
    ActorDetailsDialogComponent,
    ActorDetailsComponent,
    NotificationIconComponent,
    SeenCheckComponent,
    HeaderNavComponent,
    HeaderAvatarComponent,
    NotificationFeedDialogComponent,
    EditProfileDialogComponent,
    EditProfileComponent,
    PictureCropDialogComponent,
    WebSidebarComponent,
    DesktopBackdropCardComponent,
    DesktopCarouselComponent,
    ActorDetailsComponent,
    ResponseCommentComponent,
    CommentResponseComponent,
    DesktopMovieDetailsComponent,
    DesktopTvDetailsComponent,
    SlideToggleButtonComponent,
    MovieDetailComponent,
    TrophyCardComponent
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
    RadioButtonModule,
    ContextMenuModule,
    ConfirmDialogModule,
    StepsModule,
    MenuModule,
    ListboxModule,
    OverlayPanelModule,
    SpeedDialModule,
    InputTextareaModule,
    ConfirmPopupModule,
    ImageCropperModule,
    ToolbarModule,
    InplaceModule,
    FileUploadModule,
    HammerModule,
    ScrollPanelModule
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
    JwtHelperService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
