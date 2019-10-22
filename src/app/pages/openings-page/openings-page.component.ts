import { Component, OnInit, ViewChild } from '@angular/core';
import { RefreshTitleComponent } from '../../components/refresh-title/refresh-title.component';
import { NGXLogger } from 'ngx-logger';
import { BlyssboxService } from '../../services/blyssbox.service';
import { DevicesService } from '../../services/devices.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-openings-page',
  templateUrl: './openings-page.component.html',
  styleUrls: ['./openings-page.component.scss']
})
export class OpeningsPageComponent implements OnInit {
  @ViewChild('refresher', { static: true }) refresher: RefreshTitleComponent;

  openings = [];
  loading = false;

  constructor(
    private logger: NGXLogger,
    private blyssboxService: BlyssboxService,
    private devicesService: DevicesService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.logger.debug('OpeningsPageComponent', 'ngOnInit');
    this.userService.isLoggedIn().then(() => this.doRefresh());
  }

  run(serial: string, action: string) {
    this.logger.debug('OpeningsPageComponent', 'run', serial, action);
    let a;
    if (action === 'OPEN' || action === 'CLOSE') {
      a = action === 'CLOSE' ? 'OPEN' : 'CLOSE';
    } else {
      a = action === 'OFF' ? 'ON' : 'OFF';
    }
    this.blyssboxService.setDeviceStatus(serial, a)
      .subscribe(() => this.doRefresh());
  }

  runToggle(serial: string) {
    this.logger.debug('OpeningsPageComponent', 'runToggle', serial);
    this.blyssboxService.setDeviceStatus(serial, 'TOGGLE')
      .subscribe(() => this.doRefresh());
  }

  getDevice(type: string) {
    return this.devicesService.getDevice(type);
  }

  doRefresh() {
    this.loading = true;
    this.blyssboxService.getDevices('OPENINGS', '')
      .subscribe(f => {
        this.openings = f;
        this.logger.debug('OpeningsPageComponent', 'doRefresh', this.openings);
        this.refresher.stop();
        this.loading = false;
      });
  }

  getIcon(type: string) {
    return this.devicesService.getDevice(type).icon;
  }
}
