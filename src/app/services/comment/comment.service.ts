import { Injectable } from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  likeComment(commentId: number, userComment: any) {
    let url = `${GlobalConstants.API_URL}/api/v1/comment/likeComment`
    return this.http.post<any>(url, {
      userMail: userComment.userMail,
      commentId: commentId,
      numberLikes: 0
    });
  }
}
