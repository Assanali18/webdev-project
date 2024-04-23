import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Post} from '../../models/Post';
import {User} from '../../models/User';
import {PostService} from '../../service/post.service';
import {UserService} from '../../service/user.service';
import {NotificationService} from '../../service/notification.service';
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  posts!: Post[];
  isUserDataLoaded = false;
  user!: User;
  message!: string;

  currentPage = 1;
  isLoading = false;
  observer!: IntersectionObserver;

  @ViewChild('marker') marker: ElementRef | undefined;

  constructor(private postService: PostService,
              private userService: UserService,
              private notificationService: NotificationService,
              private tokenService: TokenStorageService,
  ) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.isLoading) {
        this.loadPosts();
      }
    }, {
      rootMargin: '100px'
    });

    this.loadPosts();

    const userId = this.tokenService.getUserId();
    this.userService.getUserProfile(userId)
      .subscribe(data => {
        console.log(data);
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
  

  loadPosts() {
    this.isLoading = true;
    this.postService.getAllPosts(this.currentPage).subscribe(data => {
      
      this.posts = this.posts.concat(data.results);
      
      this.getCommentsToPosts(this.posts);
      this.isLoading = false;
      if (data.next) {
        this.currentPage++;
      } else {
        this.observer.disconnect();
      }
    });
  }


  ngAfterViewInit() {
    if (this.marker) {
      this.observer.observe(this.marker.nativeElement);
    }
  }

  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.postService.getCommentsToPost(p.id)
        .subscribe(data => {
          p.comments = data
        })
    });
  }

  likePost(postIndex: number): void {
    const post = this.posts[postIndex];
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

  postComment(message: string, postIndex: number): void {
    if (!message.trim()) return;
    const post = this.posts[postIndex];

    console.log(post);
    this.postService.addToCommentToPost(post, message)
      .subscribe(data => {
        console.log(data);
        post.comments.push(data);
        this.message = '';
      });
  }

}
