import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-seen-check',
  templateUrl: './seen-check.component.html',
  styleUrls: ['./seen-check.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SeenCheckComponent implements OnInit {

  constructor() { }

  @Input() isChecked: boolean = false;

  ngOnInit(): void {
  }

}
