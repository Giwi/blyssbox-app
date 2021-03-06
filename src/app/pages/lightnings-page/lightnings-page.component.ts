import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BlyssboxService } from '../../services/blyssbox.service';
import { DevicesService } from '../../services/devices.service';
import { RefreshTitleComponent } from '../../components/refresh-title/refresh-title.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-lightnings-page',
  templateUrl: './lightnings-page.component.html',
  styleUrls: ['./lightnings-page.component.scss']
})
export class LightningsPageComponent implements OnInit, OnDestroy {
  @ViewChild('refresher', { static: true }) refresher: RefreshTitleComponent;
  lightnings = [];
  timer;

  constructor(
    private logger: NGXLogger,
    private blyssboxService: BlyssboxService,
    private devicesService: DevicesService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.logger.debug('LightningsPageComponent', 'ngOnInit');
    this.userService.isLoggedIn().then(() => {
      this.doRefresh();
      this.timer = setInterval(this.doRefresh.bind(this), 2000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  run(serial: string, action: string) {
    this.logger.debug('LightningsPageComponent', 'run', serial, action);
    let a;
    if (action === 'OPEN' || action === 'CLOSE') {
      a = action === 'CLOSE' ? 'OPEN' : 'CLOSE';
    } else {
      a = action === 'OFF' ? 'ON' : 'OFF';
    }
    this.blyssboxService.setDeviceStatus(serial, a)
      .subscribe(() => {
      });
  }

  runToggle(serial: string) {
    this.logger.debug('LightningsPageComponent', 'runToggle', serial);
    this.blyssboxService.setDeviceStatus(serial, 'TOGGLE')
      .subscribe(() => {
      });
  }

  getDevice(type: string) {
    return this.devicesService.getDevice(type);
  }

  doRefresh() {
    this.blyssboxService.getDevices('LIGHTING', '')
      .subscribe(f => {
        this.lightnings = f;
        this.logger.debug('LightningsPageComponent', 'doRefresh', this.lightnings);
        this.refresher.stop();
      });
  }

  getIcon(type: string) {
    return this.devicesService.getDevice(type).icon;
  }
}
