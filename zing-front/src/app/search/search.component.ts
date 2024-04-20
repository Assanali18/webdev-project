import { Component } from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  users: any[] = [];
  searchInput!:string;
  constructor(private userService: UserService) {}

  onSearch(query: string) {
    if (query) {
      this.userService.searchUsers(query).subscribe(data => {
        this.users = data;
      });
    }
  }
}
