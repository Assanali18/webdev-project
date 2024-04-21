import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../models/Post';
import {PostService} from '../../service/post.service';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postForm!: FormGroup;
  selectedFile!: File;
  isPostCreated = false;
  createdPost!: Post;
  previewImgURL: any;

  constructor(private postService: PostService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.postForm = this.createPostForm();
  }

  createPostForm(): FormGroup {
    return this.fb.group({
      body: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    this.postService.createPost(this.postForm.value.body, this.selectedFile).subscribe(data => {
      this.createdPost = data;
      console.log(data);
      this.isPostCreated = true;
      this.notificationService.showSnackBar('Post created successfully');
      this.router.navigate(['/profile']);
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e) => {
      this.previewImgURL = reader.result;
    };
  }

}
