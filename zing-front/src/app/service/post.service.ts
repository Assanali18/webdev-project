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

  deletePost(id: number): Observable<any> {
    return this.http.post(POST_API + id + '/delete', null);
  }

  likePost(id: number, username: string): Observable<any> {
    return this.http.post(POST_API + id + '/' + username + '/like', null);
  }
}
