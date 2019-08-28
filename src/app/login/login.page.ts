import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BlyssboxService } from '../services/blyssbox.service';

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
    private blyssboxService: BlyssboxService
  ) {
  }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.blyssboxService.login(this.login.username, this.login.password).subscribe(u => {
        console.log(u);
        this.router.navigateByUrl('/favorites');
      });
    }
  }
}
