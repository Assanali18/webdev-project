import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/Post';
import {User} from '../../models/User';
import {PostService} from '../../service/post.service';
import {UserService} from '../../service/user.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isPostsLoaded = false;
  posts!: Post[];
  isUserDataLoaded = false;
  user!: User;
  message!: string;

  constructor(private postService: PostService,
              private userService: UserService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        // this.getImagesToPosts(this.posts);
        this.getCommentsToPosts(this.posts);
        this.isPostsLoaded = true;
      });
    const userId = this.tokenService.getUserId();
     this.userService.getUserProfile(userId)
       .subscribe(data => {
         console.log(data);
         this.user = data;
         this.isUserDataLoaded = true;
       })
  }


  // getImagesToPosts(posts: Post[]): void {
  //   posts.forEach(p => {
  //     this.imageService.getImageToPost(p.id)
  //       .subscribe((data: { imageBytes: File | undefined; }) => {
  //         p.image = data.imageBytes;
  //       })
  //   });
  // }
  //
  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getCommentsToPost(p.id)
        .subscribe(data => {
          p.comments = data
        })
    });
  }

  likePost(postId: number, postIndex: number): void {
    const  post = this.posts[postIndex];
    console.log(post);

    if (!post.userLiked.includes(this.user.username)) {
      this.postService.likePost(post)
        .subscribe(() => {
          post.userLiked.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');

        });
    } else {
      this.postService.likePost(post)
        .subscribe(() => {
          const index = post.userLiked?.indexOf(this.user.username, 0);
          if (index > -1) {
            post.userLiked.splice(index, 1);
          }

        });
    }
  }
  //
  postComment(message: string, postId: number, postIndex: number): void {
    if (!message.trim()) return;
    const post = this.posts[postIndex];

    console.log(post);
    this.commentService.addToCommentToPost(post, message)
      .subscribe(data => {
        console.log(data);
        post.comments.push(data);
        this.message = '';
      });
  }


}
