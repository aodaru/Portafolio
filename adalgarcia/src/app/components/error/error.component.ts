import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  public page_title: string;

  constructor() {
    this.page_title = "Error 404";
  }
}
