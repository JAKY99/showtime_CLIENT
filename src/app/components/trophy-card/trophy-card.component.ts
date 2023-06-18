import {Component, Input, OnInit} from '@angular/core';
import {faEllipsisVertical, faSearch, faTrophy} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-trophy-card',
  templateUrl: './trophy-card.component.html',
  styleUrls: ['./trophy-card.component.scss']
})
export class TrophyCardComponent implements OnInit {
  @Input() trophy: any;
  name: string= "";
  image: string= "";
  description: string= "";
  date: string= "";
  type: string= "";

  faTrophy = faTrophy;
  constructor() { }

  ngOnInit(): void {
    this.name = this.trophy.name;
    this.image = this.trophy.image;
    this.description = this.trophy.description;
    this.date = this.dateTransform(this.trophy.dateCreated);
    this.type = this.trophy.type.toLowerCase();
  }

  dateTransform(localdate: string) {
    const date = new Date(localdate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear().toString();
    const transformedDate = day + '-' + month + '-' + year;
    return transformedDate;
  }
}
