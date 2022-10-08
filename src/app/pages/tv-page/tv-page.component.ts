import {Component, OnInit } from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvDetails} from "../../models/tv/tv-details";

@Component({
  selector: 'app-tv-page',
  templateUrl: './tv-page.component.html',
  styleUrls: ['./tv-page.component.scss']
})
export class TvPageComponent implements OnInit {

  topRatedTv: TvDetails[] = [];

  constructor(
    private tvService: TvService,
  ) { }

  loading = {
    tv: true,
    actors: true,
    watchProviders: true
  }

  ngOnInit(): void {
    this.tvService.fetchTopRated().toPromise()
      .then(resp => {
        this.topRatedTv = resp.results;
        // @ts-ignore
        this.topRatedTvChild?.isLoading = false;
      })
  }

}
