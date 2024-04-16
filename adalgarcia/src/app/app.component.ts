import { Component, OnInit, DoCheck } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    UserService,
    CategoryService,
  ]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'adalgarcia';
  public currentYear: number;
  public identity: any;
  public token: any;
  public url: string;
  public categories: any;

  constructor(
    private modalService: NgbModal,
    private _userServices: UserService,
    private _categoryService: CategoryService,
  ) {
    this.loadUser();
    this.url = global.url;
    this.currentYear = new Date().getFullYear();
  }


  ngOnInit(): void {
    console.log('app-corriendo');
    this.getCategories();
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userServices.getIdentity();
    this.token = this._userServices.getToken();
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
      }
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
