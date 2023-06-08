import {EventEmitter, Injectable, Output} from '@angular/core';
import {GlobalConstants} from "../../common/constants/global-constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "../token-storage.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  @Output() postCommentEvent = new EventEmitter<any>();
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) { }

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

  postComment(elementId: number, commentText: any, elementTitle: string | null,typeElement:string) {
    let url = `${GlobalConstants.API_URL}/api/v1/comment/saveComment`
    return this.http.post<any>(url, {
      elementId: elementId,
      commentText: commentText,
      userMail: this.tokenStorage.getClientUsername(),
      elementTitle: elementTitle,
      typeElement:typeElement

    });
  }

  fetchComments(requestedMovieId: number,type:string): Observable<any> {
    let url = `${GlobalConstants.API_URL}/api/v1/comment/getComments/${requestedMovieId}?type=${type}`
    return this.http.get<any>(url);
  }

  fetchUserComments(requestedMovieId: number): Observable<any> {
    let url = `${GlobalConstants.API_URL}/api/v1/comment/getUserComments/${requestedMovieId}`
    return this.http.get<any>(url);
  }

  fetchRecommendedContentForUser(){
    let url = `${GlobalConstants.API_URL}/api/v1/movie/recommended-for-user/`;
    return this.http.get<any>(url);
  }
}
