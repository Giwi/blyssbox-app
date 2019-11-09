import { Component, OnInit, ViewChild } from '@angular/core';
import { BlyssboxService } from '../../services/blyssbox.service';
import { UserService } from '../../services/user.service';
import { NGXLogger } from 'ngx-logger';
import { DevicesService } from '../../services/devices.service';
import { RefreshTitleComponent } from '../../components/refresh-title/refresh-title.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status-page',
  templateUrl: './status-page.component.html',
  styleUrls: ['./status-page.component.scss']
})
export class StatusPageComponent implements OnInit {
  @ViewChild('refresher', { static: true }) refresher: RefreshTitleComponent;

  gateway: any = {};
  devices = [];
  tech = [
    {label: 'Firmware', field: 'firmware'},
    {label: 'Version', field: 'version'},
    {label: 'IP', field: 'ip'},
    {label: 'No de série', field: 'serial'},
    {label: 'Timezone', field: 'timezone'},
    {label: 'Date d\'activation', field: 'activationDate', date: true},
    {label: 'Date d\'initialisation', field: 'initDate', date: true},
    {label: 'Dernière MAJ', field: 'updateDate', date: true},
    {label: 'Date de fabrication', field: 'manufacDate', date: true},
    {label: 'Mute', field: 'muteMode'},
  ];

  constructor(
    private logger: NGXLogger,
    private blyssboxService: BlyssboxService,
    private devicesService: DevicesService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.logger.debug('OpeningsPageComponent', 'ngOnInit');
    this.userService.isLoggedIn().then(() => this.doRefresh());
  }

  doRefresh() {
    if (this.userService.getUserData().gateway) {
      this.gateway = this.userService.getUserData().gateway;
      this.blyssboxService.getGatewayConnection().subscribe(c => {
        this.gateway = { ...this.gateway, ...c };
        console.log(this.gateway);
        this.blyssboxService.getAllDevices().subscribe(devices => {
          this.devices = devices;
          this.refresher.stop();
        });
      });
    }
  }

  reboot() {
    this.blyssboxService.setGatewayReboot().subscribe(() => {
      this.toastrService.info('Votre BlyssBox redémarre');
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
