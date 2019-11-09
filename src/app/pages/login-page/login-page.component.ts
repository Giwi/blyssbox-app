import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlyssboxService } from '../../services/blyssbox.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  submitted = false;
  login = { username: '', password: '' };

  constructor(
    public router: Router,
    private toastrService: ToastrService,
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
        this.userService.isLoggedIn().then(logged => {
          if (logged) {
            this.router.navigateByUrl('/home');
          } else {
            this.toastrService.error('Bad user or password');
          }
        });
      });
    }
  }

}
