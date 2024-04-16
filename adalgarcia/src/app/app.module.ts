import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { IdentityGuardsService } from './services/identity.guards.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuillModule } from 'ngx-quill';
import { provideQuillConfig } from 'ngx-quill/config';
import { TruncatePipe } from './pipe/truncate.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserService } from './services/user.service';
import { AgePostPipe } from './pipe/age-post.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    CategoryDetailComponent,
    CategoryNewComponent,
    PostEditComponent,
    PostDetailComponent,
    PostNewComponent,
    UserEditComponent,
    TruncatePipe,
    AgePostPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    QuillModule.forRoot(),
  ],
  providers: [
    UserService,
    IdentityGuardsService,
    provideAnimationsAsync(),
    provideQuillConfig({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          // [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video']                         // link and image, video
        ]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
