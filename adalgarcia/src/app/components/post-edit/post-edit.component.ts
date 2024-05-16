import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss',
  providers: [UserService, CategoryService, PostService],
})
export class PostEditComponent {
  public page_title: string;
  public url: string;
  public status: string;
  public filename: string;
  public post: Post;
  public categories: any;
  public identity: any;
  public token: any;
  public message: string;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.page_title = 'Editar entrada';
    this.url = global.url;
    this.status = '';
    this.filename = '';
    this.post = new Post(1, 1, 1, '', '', '', null);
    this.message = '';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.getCategories();
    this.getPost();
  }

  onSubmit(form: any) {
    this._postService.update(this.token, this.post, this.post.id).subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.status = 'success';
        }
      },
      error: (error) => {
        this.status = 'error';
        if (<any>error.error.message == 'Usuario no esta autentificado') {
          this.message = 'No ha iniciado sesion';
        }
        console.log(<any>error);
      },
    });
  }

  getCategories() {
    this._categoryService.getCategories().subscribe({
      next: (response) => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }
      },
      error: (error) => {
        console.log(<any>error);
      },
    });
  }

  getPost() {
    this._route.params.subscribe((params) => {
      let id = +params['id'];
      this._postService.getPost(id).subscribe({
        next: (response) => {
          if (response.status == 'success') {
            this.post.id = response.post.id;
            this.post.user_id = response.post.user_id;
            this.post.category_id = response.post.category_id;
            this.post.title = response.post.title;
            this.post.content = response.post.content;
            this.post.image = response.post.image;
            this.post.created_at = response.post.createdAt;
            this.filename = this.post.image;
          } else {
            this._router.navigate(['inicio']);
          }
        },
        error: (error) => {
          console.log(<any>error);
        },
      });
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this._postService.uploadImage(this.token, file).subscribe({
        next: (response) => {
          this.post.image = response.image;
          this.filename = response.image;
        },
        error: (error) => {
          console.log(<any>error);
        },
      });
    }
  }
}
