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
      userMail: userComment.username,
      commentId: commentId,
      numberLikes: 0,
      userLiked: false
    });
  }

  reportComment(commentId: number) {
    let url = GlobalConstants.API_URL + "/api/v1/comment/rejectComment/";
    return this.http.put<any>(url, commentId);
  }

  postResponseComment(commentID: number, text: string) {
    let url = GlobalConstants.API_URL + "/api/v1/comment/addResponseComment/";
    return this.http.post<any>(url, {
      commentId: commentID,
      text: text
    });
  }

  fetchResponse(commentId: number) {
    let url = `${GlobalConstants.API_URL}/api/v1/comment/fetchResponseComment/${commentId}`;
    return this.http.get<any>(url)
  }
}
