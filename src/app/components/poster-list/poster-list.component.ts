import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {MediaDetailsDialogComponent} from "../media-details-dialog/media-details-dialog.component";

@Component({
  selector: 'app-poster-list',
  templateUrl: './poster-list.component.html',
  styleUrls: ['./poster-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PosterListComponent implements OnInit {

  @Input() items: [] = [];
  @Output() eventEmitter = new EventEmitter<any>();

  @ViewChild('mediaDetailsDialogRef') mediaDetailsDialogChild : MediaDetailsDialogComponent | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // @ts-ignore
  goToContentDetails(content: Object<any>){
    this.eventEmitter.emit(content);
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

}
