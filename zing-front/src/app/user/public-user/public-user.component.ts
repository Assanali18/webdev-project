import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../models/Post";
import {PostService} from "../../service/post.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {FriendRequestService} from "../../service/friend-request.service";
import {Friend, FriendStatus} from "../../models/Friend";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FriendsComponent} from "../friends/friends.component";

@Component({
  selector: 'app-public-user',
  templateUrl: './public-user.component.html',
  styleUrl: './public-user.component.css'
})
export class PublicUserComponent implements OnInit{
  user!: User;
  isUserDataLoaded = false;
  isUserPostsLoaded = false;
  posts!: Post[];
  message!: string;
  currentUserName = this.tokenService.getUserName();
  friendStatus!: FriendStatus;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private tokenService: TokenStorageService,
    private friendService: FriendRequestService,
    private dialog: MatDialog,
    ) {

  }

  ngOnInit(){


    this.route.params.subscribe(params => {
      const username = params['username'];
      this.userService.getUserProfileByUsername(username).subscribe(user => {
        this.user = user;

        this.friendService.getFriendRequestStatus(username)
          .subscribe(status=>{
            this.friendStatus = status;
            this.isUserDataLoaded = true;
          })
      });

      this.postService.getPostForUser(username)
        .subscribe(posts =>{
          this.posts = posts;
          console.log(this.posts)
          this.isUserPostsLoaded = true;
        })
    });



  }

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

  likePost(postId: number, postIndex: number): void {
    const  post = this.posts[postIndex];
    console.log(post);

    if (!post.userLiked.includes(this.currentUserName)) {
      this.postService.likePost(post)
        .subscribe(() => {
          post.userLiked.push(this.currentUserName);
          this.notificationService.showSnackBar('Liked!');

        });
    } else {
      this.postService.likePost(post)
        .subscribe(() => {
          const index = post.userLiked?.indexOf(this.currentUserName, 0);
          if (index > -1) {
            post.userLiked.splice(index, 1);
          }

        });
    }
  }

  friendRequest(id:number){
    this.friendService.sendFriendRequest(id).subscribe(()=>{
      this.friendStatus.friend_request_sent = true;
      this.friendStatus.is_friend = false;
    });
  };

  openFriendDialog(){
    const dialogFriendConfig = new MatDialogConfig();
    dialogFriendConfig.width = '800px';
    dialogFriendConfig.data = {
      user: this.user
    };
    this.dialog.open(FriendsComponent, dialogFriendConfig);
  }



}
