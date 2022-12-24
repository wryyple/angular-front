import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./components/pages/user/auth/auth.component";
import {RegisterComponent} from "./components/pages/user/register/register.component";
import {MainComponent} from "./components/pages/main/main.component";
import {UnauthGuard} from "./guards/unauth.guard";
import {AuthGuard} from "./guards/auth.guard";
import {LogoutComponent} from "./components/pages/user/logout/logout.component";

const routes: Routes = [
  {path: 'login', component: AuthComponent, canActivate: [UnauthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UnauthGuard]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  {path: 'main', component: MainComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
