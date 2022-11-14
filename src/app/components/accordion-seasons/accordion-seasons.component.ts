import {Component, Input, OnInit} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvSeasonDetails} from "../../models/tv/tv-season-details";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-accordion-seasons',
  templateUrl: './accordion-seasons.component.html',
  styleUrls: ['./accordion-seasons.component.scss']
})
export class AccordionSeasonsComponent implements OnInit {

  constructor(private tvService : TvService) { }

  // @ts-ignore
  @Input() nbSeasons : number;
  // @ts-ignore
  @Input() tvId : number;

  // @ts-ignore
  tvSeasonDetails:TvSeasonDetails = {};
  allSeasons: TvSeasonDetails[] = [];

  // @ts-ignore
  loading = {
    seasons: true,
  }
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  async ngOnInit(): Promise <void> {

    for (let i = 0; i < this.nbSeasons; i++) {
      //to prevent i = 0 && seach season 0
      // @ts-ignore
      await this.tvService.fetchTvBySeason(this.tvId,i+1).subscribe(
        (resp) => {
          console.log(resp)
          setTimeout(()=> {
            this.tvSeasonDetails = resp;
            this.allSeasons.push(this.tvSeasonDetails);
          }, 100)
        }
      )
    }


    // par ici il faut que je recup le nb de saisons -> pour chaque son nb d'ep
    // et pour chaque saison je display un onglet de l'accordion
    // et pour chaque episode je display une card
  }

}
