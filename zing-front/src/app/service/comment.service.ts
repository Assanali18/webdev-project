import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from "../models/Post";

const COMMENT_API = '';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  addToCommentToPost(post: Post, message: string): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/posts/${post.id}/comments/`, {
      post: post.id,
      body: message
    });
  }

  getCommentsToPost(postId: number|undefined): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/posts/${postId}/comments/`);
  }

  deleteComment(commentId: number|undefined): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/comments/${commentId}`);
  }

}
