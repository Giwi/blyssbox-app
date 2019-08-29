import { Component, OnInit } from '@angular/core';
import { BlyssboxService } from '../services/blyssbox.service';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  gateway: any = {};
  devices = [];

  constructor(
    private toastController: ToastController,
    private blyssboxService: BlyssboxService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.doRefresh(undefined);
  }

  doRefresh(event) {
    if (this.userService.userData) {
      this.gateway = this.userService.userData.gateway;
      this.blyssboxService.getGatewayConnection().subscribe(c => {
        this.gateway = { ...this.gateway, ...c };
        console.log(this.gateway);
        this.blyssboxService.getAllDevices().subscribe(devices => {
          this.devices = devices;
          if (event) {
            event.target.complete();
          }
        });
      });
    }
  }

  reboot() {
    this.blyssboxService.setGatewayReboot().subscribe(() => {
      this.toastController.create({
        message: 'Votre BlyssBox redémarre',
        duration: 2000
      }).then(t => t.present());
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
