import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BlyssboxService } from '../../services/blyssbox.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public checkboxGroupForm: FormGroup;
  favorites = [];
  security = { INTRUSION: '', DOMESTIC: '' };

  constructor(
    private logger: NGXLogger,
    private blyssboxService: BlyssboxService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.logger.debug('HomePageComponent', 'ngOnInit');
    this.userService.isLoggedIn().then(() => this.doRefresh());
  }

  run(serial: number) {
    this.blyssboxService.setFavoriteStart(serial).subscribe(() => this.doRefresh());
  }

  runSecurity(serial: string) {
    //this.blyssboxService.setFavoriteStart(serial).subscribe(() => this.doRefresh());
  }

  doRefresh() {
    this.logger.debug('HomePageComponent', 'doRefresh');
    this.blyssboxService.getFavorites().subscribe(f => {
      this.favorites = f;
      this.logger.debug('HomePageComponent', 'doRefresh', 'getFavorites', this.favorites);
    });
    this.blyssboxService.getGatewayModes().subscribe(f => {
      this.logger.debug('HomePageComponent', 'doRefresh', 'getGatewayModes', f);
      f.modeList.forEach(k => this.security[ k.subCategory ] = k.mode);
    });
  }

  getIcon(type: string) {
    switch(type) {
      case  'INTRUSION':
        return 'fa-eye';
      case  'LIGHTNINGS':
        return 'fa-lightbulb-o';
      case  'SHUTTERS':
        return 'fa-window-maximize';
      default:
        return 'fa-star';
    }
  }
}
