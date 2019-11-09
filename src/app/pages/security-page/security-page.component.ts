import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BlyssboxService } from '../../services/blyssbox.service';
import { UserService } from '../../services/user.service';
import { RefreshTitleComponent } from '../../components/refresh-title/refresh-title.component';

@Component({
  selector: 'app-security-page',
  templateUrl: './security-page.component.html',
  styleUrls: ['./security-page.component.scss']
})
export class SecurityPageComponent implements OnInit, OnDestroy {
  @ViewChild('refresher', { static: true }) refresher: RefreshTitleComponent;

  timer;
  favorites = [];
  security = { INTRUSION: '', DOMESTIC: '' };

  constructor(
    private logger: NGXLogger,
    private blyssboxService: BlyssboxService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.logger.debug('HomePageComponent', 'ngOnInit');
    this.userService.isLoggedIn().then(() => {
      this.doRefresh();
      this.timer = setInterval(this.doRefresh.bind(this), 2000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  runSecurity(category: string, value: string) {
    this.blyssboxService.setGatewayCategoryMode(category, value).subscribe(() => this.doRefresh());
  }

  doRefresh() {
    this.logger.debug('HomePageComponent', 'doRefresh');
    this.blyssboxService.getGatewayModes().subscribe(f => {
      this.logger.debug('HomePageComponent', 'doRefresh', 'getGatewayModes', f);
      f.modeList.forEach(k => this.security[ k.subCategory ] = k.mode);
      this.refresher.stop();
    });
  }
}
