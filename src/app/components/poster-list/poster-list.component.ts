import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-poster-list',
  templateUrl: './poster-list.component.html',
  styleUrls: ['./poster-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PosterListComponent implements OnInit {

  @Input() items: [] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // @ts-ignore
  goToContentDetails(content: Object<any>){
    if (content.original_name){
      this.redirectTo('/tv/' + content.id);
    }else{
      this.redirectTo('/movie/' + content.id);
    }
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

}
