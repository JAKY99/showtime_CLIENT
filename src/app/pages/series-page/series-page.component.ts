import {Component, OnInit } from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvDetails} from "../../models/tv/tv-details";

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent implements OnInit {

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
