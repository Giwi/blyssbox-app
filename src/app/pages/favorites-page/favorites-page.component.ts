import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BlyssboxService } from '../../services/blyssbox.service';
import { NGXLogger } from 'ngx-logger';
import { RefreshTitleComponent } from '../../components/refresh-title/refresh-title.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  @ViewChild('refresher', { static: true }) refresher: RefreshTitleComponent;
  favorites = [];
  timer;

  constructor(
    private logger: NGXLogger,
    private blyssboxService: BlyssboxService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.logger.debug('FavoritesPageComponent', 'ngOnInit');
    this.userService.isLoggedIn().then(() => {
      this.doRefresh();
      this.timer = setInterval(this.doRefresh.bind(this), 2000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  run(serial: number) {
    this.blyssboxService.setFavoriteStart(serial).subscribe(() => {});
  }

  doRefresh() {
    this.logger.debug('FavoritesPageComponent', 'doRefresh');
    this.blyssboxService.getFavorites().subscribe(f => {
      this.favorites = f;
      this.logger.debug('FavoritesPageComponent', 'doRefresh', this.favorites);
      this.refresher.stop();
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
