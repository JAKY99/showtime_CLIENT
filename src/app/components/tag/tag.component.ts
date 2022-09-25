import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TagComponent implements OnInit {

  @Input() icon: string = "";
  @Input() title: string | null = "tag";
  @Input() full: boolean = false;
  @Input() rounded: boolean = false;
  @Input() borderRadius: boolean = false;
  @Input() upperCase: boolean = false;
  /*
  * 1 : small size
  * 2 : default size
  * 3 : big size
  * */
  @Input() size: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  getClass(){
    let classes = [];

    if (this.full){
      classes.push('full');
    }else{
      classes.push('outlined');
    }

    if(this.rounded){
      classes.push('rounded');
    }

    if(this.borderRadius && !this.rounded){
      classes.push('border-radius');
    }

    if (this.size === 1){
      classes.push('small-size-2');
    }else if (this.size === 2){
      classes.push('small-size');
    }else if (this.size === 3){
      classes.push('big-size');
    } else{
      classes.push('default-size');
    }

    return classes.join(' ');
  }

}
