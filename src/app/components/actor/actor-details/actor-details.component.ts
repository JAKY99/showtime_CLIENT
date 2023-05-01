import {Component, Input, OnInit} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getImageCompletePath } from 'app/js/image-helper';
import {PeopleService} from "../../../services/people/people.service";

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss']
})
export class ActorDetailsComponent implements OnInit {

  @Input() requestedActorId: number = 0;
  faUser = faUser;
  constructor(private peopleService: PeopleService) { }

  isLoading: boolean = false;
  actor: any = {}

  ngOnInit(): void {
    this.getActorDetails();
  }

  getImageCompletePath(profile_path: string | null, imageSize: string) {
    return getImageCompletePath(profile_path, imageSize);
  }

  getActorDetails(){
    this.isLoading = true;
    this.peopleService.fetchActorDetails(this.requestedActorId).subscribe(
      response => {
        response = JSON.parse(response.data);
        this.actor = response;
        this.isLoading = false;
      }
    )
  }

}
