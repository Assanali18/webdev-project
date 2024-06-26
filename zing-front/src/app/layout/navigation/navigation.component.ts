import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../service/token-storage.service';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent implements OnInit{


  isLoggedIn:boolean = false;
  isDataLoaded:boolean = false;
  user!: User;

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.isLoggedIn = !!this.tokenStorage.getUserId();
    if(this.isLoggedIn){
      this.userService.getUserProfile(this.tokenStorage.getUserId())
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        })
    }
  }

  logout(){
    this.tokenStorage.logOut();
    this.router.navigate(['/login']);
  }

}
