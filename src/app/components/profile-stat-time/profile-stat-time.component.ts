import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-stat-time',
  templateUrl: './profile-stat-time.component.html',
  styleUrls: ['./profile-stat-time.component.scss']
})
export class ProfileStatTimeComponent implements OnInit {
  @Input() title: string = "";
  @Input() time: number = 0;

  monthTime: number = 0;
  daysTime: number = 0;
  hoursTime: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  splitTime(){
    //Here split time to 3 (month / days / hours) and put them into the 3 variables above
  }

}
