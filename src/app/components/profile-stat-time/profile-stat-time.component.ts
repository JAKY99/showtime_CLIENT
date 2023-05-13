import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-stat-time',
  templateUrl: './profile-stat-time.component.html',
  styleUrls: ['./profile-stat-time.component.scss']
})
export class ProfileStatTimeComponent implements OnInit {
  @Input() title: string = "";
  @Input() time: string = "0/0/0";
  @Input() isBig: boolean = false;

  monthTime: number = 0;
  daysTime: number = 0;
  hoursTime: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.splitTime();
  }
  ngOnChanges() {
    this.splitTime();
  }
  splitTime() {
    this.time.split("/").forEach((time, index) => {

      // @ts-ignore
      time = parseInt(time,10)
      // console.log(time)
      if (index === 0) {
        // @ts-ignore
        this.monthTime = time;
      }
      if (index === 1) {
        // @ts-ignore
        this.daysTime = time;
      }
      if (index === 2) {
        // @ts-ignore
        this.hoursTime= time;
      }
    })
  }
}
