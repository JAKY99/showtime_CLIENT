import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class Page404Component implements OnInit {
  isLoading: any;
  loginForm: any;

  constructor() { }

  ngOnInit(): void {
  }

}
