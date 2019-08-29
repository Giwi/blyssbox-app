import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BlyssboxService } from '../services/blyssbox.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  submitted = false;
  login = { username: '', password: '' };

  constructor(
    public router: Router,
    private blyssboxService: BlyssboxService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.blyssboxService.login(this.login.username, this.login.password).subscribe(u => {
        this.userService.isLoggedIn().then(() => this.router.navigateByUrl('/favorites'));
      });
    }
  }
}
