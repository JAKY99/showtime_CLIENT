import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvSeasonDetails} from "../../models/tv/tv-season-details";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-accordion-seasons',
  templateUrl: './accordion-seasons.component.html',
  styleUrls: ['./accordion-seasons.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionSeasonsComponent implements OnInit {

  constructor(private tvService : TvService) { }

  // @ts-ignore
  @Input() nbSeasons : number;
  // @ts-ignore
  @Input() tvId : number;

  episodesSeen: number = 3;

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

      //Query nb d'ep vu / id saison
      // ->

      //to prevent i = 0 && seach season 0
      // @ts-ignore
      await this.tvService.fetchTvBySeason(this.tvId,i+1).subscribe(
        (resp) => {
          setTimeout(()=> {
            resp = JSON.parse(resp.data);
            this.tvSeasonDetails = resp;
            this.allSeasons.push(this.tvSeasonDetails);
            this.allSeasons.sort((a, b) => a.season_number - b.season_number)
          }, 100)
        }
      )
    }

    // chercher le nb d'episodes vu pour chaque saison pour la checkmark + barre de progression
    // pour faire le calcul de la barre de progression :
    // -> rajouter un champ dans le modèle de datas : nb ep vues
    // faire le calcul pour le transformer en %age direct dans le front
  }

}
