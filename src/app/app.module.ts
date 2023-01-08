import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/pages/user/auth/auth.component';
import { RegisterComponent } from './components/pages/user/register/register.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MainComponent } from './components/pages/main/main.component';
import { LogoutComponent } from './components/pages/user/logout/logout.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import {ProfileComponent} from "./components/pages/user/profile/profile.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    LogoutComponent,
    CreatePostComponent,
    ProfileComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
