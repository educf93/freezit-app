import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent {
  username: string;
  password: string;
  error: boolean = false;
  valid: boolean;

  constructor(private api: ApiService, private router: Router) {}

  register() {
    const {
      username,
      password
    } = this;

    this.password = '';
    if (password !== undefined && username !== undefined) {
      if (username.trim() !== '' && password.trim() !== '') {
        this.valid = true;
        this.api.registerUser(username.trim(), password.trim()).then(() =>{
          setTimeout(()=>{
            this.router.navigate(['/login'])
          },3000)
          
        });
        this.error = false;
      } else {
        this.error = true;
      }
    } else {
      this.error = true
    }
  }
}
