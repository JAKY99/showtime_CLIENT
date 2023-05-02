import {Component, Input, OnInit,ViewEncapsulation} from '@angular/core';
import {TvEpisodeDetails} from "../../models/tv/tv-episode-details";
import {formatDate} from "@angular/common";
import {TvService} from "../../services/tv/tv.service";

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EpisodeCardComponent implements OnInit {

  constructor(private tvService : TvService) { }

  // @ts-ignore
  @Input() item : TvEpisodeDetails ;
  // @ts-ignore
  @Input() seasonId : number;
  // @ts-ignore
  @Input() tvId : number;

  userEpisodeStatus = {
    episode:{
      checked:''
    }
  }

  imageState: string = "setup";
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  ngOnInit(): void {
    console.log(this.item)

    // this.tvService.fetchTvEpisodeWatchedStatus(
    //   this.item.id
    // ).subscribe(
    //   (resp) => {
    //     if(resp === true) {
    //       this.userEpisodeStatus.episode.checked = 'checked';
    //     }
    //   })

    // @ts-ignore
    return this.todayDate;
  }

  imageStateChange($event: string) {
    this.imageState = $event;
  }

  isImageLoaded(){
    return this.imageState === 'finally';
  }

  async updateEpisodeStatus() {

    await this.tvService.addEpisodeToWatchedList(
      this.tvId,
      this.seasonId,
      this.item.id
    ).subscribe(
      (resp) => {
        console.log(resp)
        if(resp === true){
          this.userEpisodeStatus.episode.checked = 'checked';
        }

        // this.fetchWatchedSeasonInfos();
      }
    )
  }

}
