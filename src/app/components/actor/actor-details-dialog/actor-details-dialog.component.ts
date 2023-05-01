import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {ActorDetailsComponent} from "../actor-details/actor-details.component";

@Component({
  selector: 'app-actor-details-dialog',
  templateUrl: './actor-details-dialog.component.html',
  styleUrls: ['./actor-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActorDetailsDialogComponent implements OnInit {

  @ViewChild('actorDetailsRef') actorDetailsChild: ActorDetailsComponent | undefined;

  faChevronDown = faChevronDown;

  viewedDialogShown: boolean = false;
  viewedDialogPosition: string = 'bottom';

  actor: any = {
    id: null
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  close() {
    this.viewedDialogShown = false
  }

  open(idActor: number) {
    this.viewedDialogShown = true
    this.actor.id = idActor;
  }

}
