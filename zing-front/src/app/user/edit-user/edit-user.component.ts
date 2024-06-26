import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../service/notification.service';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{

  public profileEditForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      firstName: [
        this.data.user.first_name,
        Validators.compose([Validators.required])
      ],
      lastName: [
        this.data.user.last_name,
        Validators.compose([Validators.required])
      ],
      bio: [
        this.data.user.bio,
        Validators.compose([Validators.required])
      ],
    });
  }

  submit() {
    this.userService.updateUser(this.updateUser())
      .subscribe(() => {
        this.notificationService.showSnackBar('User updated succesfully');
        this.dialogRef.close();
      })
  }

  private updateUser(): User {
    this.data.user.first_name = this.profileEditForm.value.firstName;
    this.data.user.last_name = this.profileEditForm.value.lastName;
    this.data.user.bio = this.profileEditForm.value.bio;
    return this.data.user;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
