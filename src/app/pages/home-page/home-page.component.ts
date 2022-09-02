import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MessageService} from "primeng/api";
import {MovieService} from "../../services/movie/movie.service";
import {UserLocationDatasService} from "../../services/geo/user-location-datas.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomePageComponent implements OnInit {

  moviesInTheaters: any[] = [];
  newMovies: any[] = [];
  topRated: any[] = [];
  upComing: any[] = [];
  userLocationData = {
    country: {
      iso_code: ""
    }
  };

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private movieService: MovieService,
    private userGeoService: UserLocationDatasService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userGeoService.fetchLocationData().toPromise()
      .then(resp => {
        this.userLocationData = resp;
      })
    this.movieService.fetchInTheaters(this.userLocationData.country.iso_code).toPromise()
      .then(resp => {
        this.moviesInTheaters = resp.results;
      })
    this.movieService.fetchTopRated().toPromise()
      .then(resp => {
        this.topRated = resp.results;
      })
    this.movieService.fetchUpcoming().toPromise()
      .then(resp => {
        this.upComing = resp.results;
      })
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }

}
