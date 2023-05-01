import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment-avatar',
  templateUrl: './comment-avatar.component.html',
  styleUrls: ['./comment-avatar.component.scss']
})
export class CommentAvatarComponent implements OnInit {

  @Input() profilePicture = null;

  constructor() { }

  ngOnInit(): void {
  }

}
