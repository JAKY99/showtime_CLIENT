import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment-response',
  templateUrl: './comment-response.component.html',
  styleUrls: ['./comment-response.component.scss']
})
export class CommentResponseComponent implements OnInit {
  @Input() comment: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
