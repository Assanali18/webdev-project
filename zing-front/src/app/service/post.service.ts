import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';

const POST_API = 'http://localhost:8000/api/posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  createPost(body: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('body', body);
    formData.append('image', file, file.name);
    return this.http.post(POST_API, formData);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(POST_API);
  }

  deletePost(post: Post): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/posts/${post.id}`, post);
  }

  likePost(post: Post): Observable<any> {
    return this.http.post(`http://localhost:8000/api/posts/${post.id}/like/`, post);
  }

  addToCommentToPost(post: Post, message: string): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/posts/${post.id}/comments/`, {
      post: post.id,
      body: message
    });
  }

  getCommentsToPost(postId: number | undefined): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/posts/${postId}/comments/`);
  }
}
