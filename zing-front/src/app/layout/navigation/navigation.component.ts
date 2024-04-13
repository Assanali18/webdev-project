import { Component } from '@angular/core';
import { User } from '../../models/User';
import { TokenStorageService } from '../../service/token-storage.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  isLoggedIn:boolean = false;
  isDataLoaded:boolean = false;
  user!: User;

  constructor(
    private tokenService: TokenStorageService,
    private userService: UserService,
    private router: Router,
  ){}

  ngOnInit(){
    this.isLoggedIn = !!this.tokenService.getToken();

    if(this.isLoggedIn){
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        })
    }
  }

  logout(){
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

}
