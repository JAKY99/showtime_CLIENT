import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-stat-number',
  templateUrl: './profile-stat-number.component.html',
  styleUrls: ['./profile-stat-number.component.scss']
})
export class ProfileStatNumberComponent implements OnInit {

  @Input() title: string = "";
  @Input() number: number = 0;
  @Input() isBig: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
