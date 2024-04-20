import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';

const POST_API = '';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  createPost(body:string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('body', body);
    formData.append('image', file, file.name);
    return this.http.post('http://localhost:8000/posts/', formData);
  }

  getAllPosts(): Observable<any> {
    return this.http.get('http://localhost:8000/posts/');
  }

  getPostForCurrentUser(id:string): Observable<any> {
    return this.http.get(`http://localhost:8000/user/${id}/posts`);
  }

  getPostForUser(username:string): Observable<any> {
    return this.http.get(`http://localhost:8000/users/${username}/posts`);
  }

  deletePost(post: Post): Observable<any> {
    return this.http.delete(`http://localhost:8000/posts/${post.id}`, post);
  }

  likePost(post: Post): Observable<any> {
    return this.http.post(`http://localhost:8000/posts/${post.id}/like/`, post);
  }


}
