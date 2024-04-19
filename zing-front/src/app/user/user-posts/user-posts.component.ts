import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/Post';
import {PostService} from '../../service/post.service';
import {ImageUploadService} from '../../service/image-upload.service';
import {CommentService} from '../../service/comment.service';
import {NotificationService} from '../../service/notification.service';
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent{

  isUserPostsLoaded = false;
  posts!: Post [];


  constructor(private postService: PostService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private tokenStorage: TokenStorageService,
              ) {
  }

  ngOnInit(): void {
    const userId = this.tokenStorage.getUserId();
    console.log(userId);
    this.postService.getPostForCurrentUser(userId)
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        // this.getImagesToPosts(this.posts);
        // this.getCommentsToPosts(this.posts);
        this.isUserPostsLoaded = true;
      });
  }

  // getImagesToPosts(posts: Post[]): void {
  //   posts.forEach(p => {
  //     this.imageService.getImageToPost(p.id)
  //       .subscribe((data: { imageBytes: File | undefined; }) => {
  //         p.image = data.imageBytes;
  //       });
  //   });
  // }


  // getCommentsToPosts(posts: Post[]): void {
  //   posts.forEach(p => {
  //     this.commentService.getCommentsToPost(p.id)
  //       .subscribe(data => {
  //         p.comments = data;
  //       });
  //   });
  // }

  removePost(post: Post, index: number): void {
    console.log(post);
    const result = confirm('Do you really want to delete this post?');
    if (result) {
      this.postService.deletePost(post)
        .subscribe(() => {
          this.posts.splice(index, 1);
          this.notificationService.showSnackBar('Post deleted');
        });
    }
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  deleteComment(commentId: number|undefined, postIndex: number, commentIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.deleteComment(commentId)
      .subscribe(() => {
        this.notificationService.showSnackBar('Comment removed');
        post.comments.splice(commentIndex, 1);
      });
  }

}
