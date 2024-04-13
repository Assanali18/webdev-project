import { Component } from '@angular/core';
import { User } from '../../models/User';
import { TokenStorageService } from '../../service/token-storage.service';
import { PostService } from '../../service/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from '../../service/notification.service';
import { ImageUploadService } from '../../service/image-upload.service';
import { UserService } from '../../service/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
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
  ){}

  ngOnInit(){
    this.userService.getCurrentUser()
    .subscribe(data =>{
      this.user = data;
      this.isUserDataLoaded = true;
    });

    this.imageService.getProfileImage()
    .subscribe(data =>{
      this.userProfileImage = data.imageBytes;
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
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user
    };
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(){
    if(this.selectedFile != null){
      this.imageService.uploadImageToUser(this.selectedFile)
      .subscribe(() =>{
        this.notificationService.showSnackBar('Profile image updated succesfully');
      })
    }
  }



}

