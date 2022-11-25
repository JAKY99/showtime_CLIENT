import {Component, Input, OnInit} from '@angular/core';
import {TvService} from "../../services/tv/tv.service";
import {TvSeasonDetails} from "../../models/tv/tv-season-details";
import {formatDate} from "@angular/common";
import {ProgressBarModule} from 'primeng/progressbar';

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

  episodesSeen: number = 5;

  // @ts-ignore
  tvSeasonDetails:TvSeasonDetails = {};
  allSeasons: TvSeasonDetails[] = [];

  // @ts-ignore
  loading = {
    seasons: true,
  }
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  onTabOpen(e : any) {
    var index = e.index;
    // scroll to element
    var element = document.getElementById("season-"+index);
    element?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  async ngOnInit(): Promise <void> {

    for (let i = 0; i < this.nbSeasons; i++) {

      //Query nb d'ep vu / id saison
      // ->

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

    // chercher le nb d'episodes vu pour chaque saison pour la checkmark + barre de progression
    // pour faire le calcul de la barre de progression :
    // -> rajouter un champ dans le modèle de datas : nb ep vues
    // faire le calcul pour le transformer en %age direct dans le front
  }

}
