import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrl: './category-new.component.scss',
  providers: [
    UserService,
    CategoryService
  ]
})
export class CategoryNewComponent {
  public page_title: string;
  public identity: any;
  public token: any;
  public category: Category;
  public status: string;
  public message: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = "Crear Nueva Categoría";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
    this.status = "";
    this.message = "";
  };

  onSubmit(form: any) {
    this._categoryService.create(this.token, this.category).subscribe({
      next: (response) => {
        if (response.status == "success") {
          this.status = response.status;
          form.reset();
        } else {
          this.status = "error";
        }
      },
      error: (error) => {
        this.status = "error";
        if(<any>error.error.message == "Usuario no esta autentificado") {
          this.message = "No ha iniciado sesion";
        }
        console.log(<any>error);
      }
    });
  }

}
