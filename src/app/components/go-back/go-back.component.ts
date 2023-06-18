import {Component, HostListener, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {NavigationService} from "../../services/navigation/navigation.service";


@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GoBackComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private navigationService: NavigationService
  ) {}

  faArrowLeft = faArrowLeft;

  ngOnInit(): void {
  }

  back(): void {
    this.navigationService.back();
  }

}
