import { Injectable } from '@angular/core';
import {Router, RoutesRecognized} from "@angular/router";
import {filter, map, pairwise} from "rxjs/operators";
import {Location} from "@angular/common";

const HOME_URL = "/home";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private previousUrl?: string;

  constructor(
    private readonly router: Router,
    private readonly location: Location
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof RoutesRecognized),
        map((event) => event as RoutesRecognized),
        pairwise()
      )
      .subscribe((events: [RoutesRecognized, RoutesRecognized]) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });
  }

  public back(): void {
    if (this.previousUrl !== undefined) {
      this.location.back();
      //TODO: find a better solution for this
      setTimeout(() => {
        window.location.reload();
      }, 100)
    } else {
      this.router.navigate([HOME_URL], { replaceUrl: true });
    }
  }
}
