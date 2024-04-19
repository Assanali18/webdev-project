import {Component, OnInit} from '@angular/core';
import { User } from '../../models/User';
import { TokenStorageService } from '../../service/token-storage.service';
import { PostService } from '../../service/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from '../../service/notification.service';
import { ImageUploadService } from '../../service/image-upload.service';
import { UserService } from '../../service/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user!: User;
  selectedFile!: File;
  userProfileImage!: File;
  previewImgURL: any;
  isUserDataLoaded = false;

  constructor(
    private tokenService: TokenStorageService,
    private postService: PostService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private imageService: ImageUploadService,
    private userService: UserService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
  ){}

  ngOnInit(){
    const userId = this.tokenStorage.getUserId();
    this.userService.getUserProfile(userId)
    .subscribe(data =>{
      this.user = data;
      console.log(this.user)
      this.isUserDataLoaded = true;
    });
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () =>{
      this.previewImgURL = reader.result;
    }
  }

  openEditDialog(){
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '800px';
    dialogUserEditConfig.data = {
      user: this.user
    };
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }


  onUpload() {
    if (this.selectedFile != null) {
      this.userService.updateUserImageProfile(this.user, this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Profile image updated successfully');
          // @ts-ignore
          this.selectedFile = null;
        }, error => {
          console.error('Error updating profile:', error);
          this.notificationService.showSnackBar('Failed to update profile image');
        });
    }
  }



}

