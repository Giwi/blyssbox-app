import { Component, OnInit } from '@angular/core';
import { BlyssboxService } from '../services/blyssbox.service';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-lightnings',
  templateUrl: './lightnings.page.html',
  styleUrls: ['./lightnings.page.scss'],
})
export class LightningsPage implements OnInit {
  lightnings = [];

  constructor(
    private blyssboxService: BlyssboxService,
    private devicesService: DevicesService
  ) {
  }

  ngOnInit() {
    this.doRefresh(undefined);
  }

  run(serial: string, action: string) {
    let a;
    if (action === 'OPEN' || action === 'CLOSE') {
      a = action === 'CLOSE' ? 'OPEN' : 'CLOSE';
    } else {
      a = action === 'OFF' ? 'ON' : 'OFF';
    }
    this.blyssboxService.setDeviceStatus(serial, a)
      .subscribe(() => this.doRefresh(undefined));
  }

  runToggle(serial: string) {
    this.blyssboxService.setDeviceStatus(serial, 'TOGGLE')
      .subscribe(() => this.doRefresh(undefined));
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

  getDevice(type: string) {
    return this.devicesService.getDevice(type);
  }

  doRefresh(event) {
    this.blyssboxService.getDevices('LIGHTING', '')
      .subscribe(f => {
        this.lightnings = f;
        (f || []).forEach(fav => console.log(fav));
        if (event) {
          event.target.complete();
        }
      });
  }
}
