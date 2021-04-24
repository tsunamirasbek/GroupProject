import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  public user = {
    username: '',
    password: '',
    password2: ''
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.SignUp(this.user).subscribe()
  }
}
