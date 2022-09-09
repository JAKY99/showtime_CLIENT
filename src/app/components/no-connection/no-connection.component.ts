import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-no-connection',
  templateUrl: './no-connection.component.html',
  styleUrls: ['./no-connection.component.scss']
})
export class NoConnectionComponent implements OnInit {

  @Input() model: boolean = true;
  isClosing: boolean = false;

  constructor(private  router: Router) { }

  ngOnInit(): void {
  }

  refreshComponent(){
    this.router.navigateByUrl(this.router.url).then(r => console.log('here'))
  }

  close(){
    this.isClosing = true;
    setTimeout(() => {
    this.model = false;
    }, 250)
  }

}
