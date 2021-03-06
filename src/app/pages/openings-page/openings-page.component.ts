import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class OpeningsPageComponent implements OnInit, OnDestroy {
  @ViewChild('refresher', { static: true }) refresher: RefreshTitleComponent;

  openings = [];
  timer;

  constructor(
    private logger: NGXLogger,
    private blyssboxService: BlyssboxService,
    private devicesService: DevicesService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.logger.debug('OpeningsPageComponent', 'ngOnInit');
    this.userService.isLoggedIn().then(() => {
      this.doRefresh();
      this.timer = setInterval(this.doRefresh.bind(this), 2000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  run(serial: string, action: string) {
    this.logger.debug('OpeningsPageComponent', 'run', serial, action);
    let a;
    if (action === 'OPEN' || action === 'CLOSE') {
      a = action === 'CLOSE' ? 'OPEN' : 'CLOSE';
    } else {
      a = action === 'OFF' ? 'ON' : 'OFF';
    }
    this.blyssboxService.setDeviceStatus(serial, a).subscribe(() => {
    });
  }

  runToggle(serial: string) {
    this.logger.debug('OpeningsPageComponent', 'runToggle', serial);
    this.blyssboxService.setDeviceStatus(serial, 'TOGGLE')
      .subscribe(() => {
      });
  }

  getDevice(type: string) {
    return this.devicesService.getDevice(type);
  }

  doRefresh() {
    this.blyssboxService.getDevices('OPENINGS', '')
      .subscribe(f => {
        this.openings = f;
        this.logger.debug('OpeningsPageComponent', 'doRefresh', this.openings);
        this.refresher.stop();
      });
  }

  getIcon(type: string) {
    return this.devicesService.getDevice(type).icon;
  }
}
