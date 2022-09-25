import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DescriptionComponent implements OnInit {

  constructor() { }

  @Input() description: string | null = "No description available";
  @Input() maxLine: number = 6;

  ngOnInit(): void {
  }

}
