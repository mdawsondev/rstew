import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { HeaderComponent } from './header/header.component';
import { OauthComponent } from './oauth/oauth.component';
import { FeedComponent } from './feed/feed.component';
import { CommentComponent } from './feed/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    SandboxComponent,
    HeaderComponent,
    OauthComponent,
    FeedComponent,
    CommentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
