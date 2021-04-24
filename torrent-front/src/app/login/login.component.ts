import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router    
  ) { }

  public user = {
    username: '',
    password: ''
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.SignIn(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token!)
        localStorage.setItem('username', this.user.username)

        this.router.navigate(['main-page/Race'])
      }
    )
  }

}
