import { Routes } from '@angular/router';
import {MessengerComponent} from "./messenger/messenger.component";
import {ProfileComponent} from "./profile/profile.component";
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
	{path: '', redirectTo: 'main-page', pathMatch: "full"},
	{path: 'main-page', component: MainPageComponent},
	{path: 'messenger', component: MessengerComponent},
	{path: 'profile', component: ProfileComponent},
];
