import { Component, OnInit } from '@angular/core';
import { BlyssboxService } from '../services/blyssbox.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  gateway: any = {};
  devices = [];

  constructor(private blyssboxService: BlyssboxService, private userService: UserService) {
  }

  ngOnInit() {
    this.doRefresh(undefined);
  }

  doRefresh(event) {
    this.gateway = this.userService.userData.gateway;
    this.blyssboxService.getAllDevices().subscribe(devices => {
      this.devices = devices;
      if (event) {
        event.target.complete();
      }
    });
  }

  getColor(level) {
    if (level < 25) {
      return 'danger';
    } else if (level < 50) {
      return 'warning';
    } else {
      return 'success';
    }
  }
}
