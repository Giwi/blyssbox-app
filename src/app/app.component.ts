import { Component, OnDestroy, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Connection, MessageBus } from 'ngx-message-bus';
import { BlyssboxService } from './services/blyssbox.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn = false;
  loaded = false;
  hideMenu = false;
  private myConnection: Connection;

  constructor(private logger: NGXLogger,
              private toastrService: ToastrService,
              private messageBus: MessageBus,
              private router: Router,
              private blyssboxService: BlyssboxService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.checkLoginStatus();
    this.myConnection = this.messageBus.connect('blyss', 'AppComponent');
    this.myConnection.on({
      groupId: 'user:login',
      callback: this.updateLoggedInStatus.bind(this)
    });
    this.myConnection.on({
      groupId: 'user:logout',
      callback: this.updateLoggedInStatus.bind(this)
    });
  }

  ngOnDestroy() {
    this.messageBus.disconnect(this.myConnection);
  }

  checkLoginStatus() {
    this.userService.isLoggedIn().then(loggedIn => {
      this.logger.debug('AppComponent', 'checkLoginStatus', loggedIn);
      this.loaded = true;
      // this.blyssboxService.sendPushToken().subscribe(r => console.log('sendPushToken', r));
      this.updateLoggedInStatus(!!loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    this.logger.debug('AppComponent', 'updateLoggedInStatus', loggedIn);
    setTimeout(() => {
      this.loggedIn = loggedIn;
      if (!loggedIn) {
        this.router.navigateByUrl('/login').then(() => {
          //empty
        });
      }
    }, 300);
  }

}
