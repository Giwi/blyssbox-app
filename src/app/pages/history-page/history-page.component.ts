import { Component, OnInit, ViewChild } from '@angular/core';
import { BlyssboxService } from '../../services/blyssbox.service';
import { RefreshTitleComponent } from '../../components/refresh-title/refresh-title.component';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  @ViewChild('refresher', { static: true }) refresher: RefreshTitleComponent;

  history = [];
  totalPage: number;
  currentPage = 1;
  loading = false;
  desc = {
    INTRUSION: {
      MOFF: 'Surveillance intrusion désactivée par {type}',
      MON: 'Surveillance intrusion activée par {type}',
      MPR: 'Surveillance intrusion partielle {type}'
    }
  };

  reasons = {
    0: { label: 'DETECTION', icon: 'fa-street-view', color: 'bg-danger' },
    1: { label: 'Changement de mode', icon: 'fa-toggle-on', color: 'bg-secondary' },
    2: { label: 'Reconnexion de votre Blyssbox par liaison GSM', icon: 'fa-signal', color: 'bg-success' },
    3: { label: 'Reconnexion de votre Blyssbox par liaison haut débit', icon: 'fa-signal', color: 'bg-success' },
    4: { label: 'Perte d\'alimentation électrique de votre Blyssbox', icon: 'fa-plug', color: 'bg-warning' },
    5: { label: 'Blyssbox de nouveau alimentée', icon: 'fa-plug', color: 'bg-success' },
    6: { label: 'Batterie de votre Blyssbox faible', icon: 'fa-battery-empty', color: 'bg-warning' },
    7: { label: 'Batterie faible', icon: 'fa-battery-empty', color: 'bg-warning' },
    8: { label: 'Connexion de votre Blyssbox', icon: 'fa-podcast', color: 'bg-warning' },
    9: { label: 'Déconnexion de votre Blyssbox', icon: 'fa-podcast', color: 'bg-warning' },
    10: { label: 'Perte de connexion de votre Blyssbox', icon: 'fa-podcast', color: 'bg-warning' },
    11: { label: 'Erreur système de votre Blyssbox', icon: 'fa-bug', color: 'bg-danger' },
    12: { label: 'Accessoire non joignable', icon: 'fa-tag', color: 'bg-warning' },
    13: { label: 'Accessoire à nouveau joignable', icon: 'fa-tag', color: 'bg-success' },
    14: { label: 'SCENARIO_ALERT', icon: 'fa-warning', color: 'bg-warning' },
    15: { label: 'SCENARIO_KEYPAD', icon: 'fa-keyboard-o', color: 'bg-secondary' },
    16: { label: 'Arrachement', icon: 'fa-shield', color: 'bg-danger' },
    17: { label: 'STATE', icon: 'fa-toggle-on', color: 'bg-secondary' },
    18: { label: 'NODETECT', icon: 'fa-tag', color: 'bg-warning' },
    19: { label: 'LIVE_WEB', icon: 'fa-globe', color: 'bg-warning' },
    20: { label: 'LIVE_MOBILE', icon: 'fa-mobile', color: 'bg-warning' },
    21: { label: 'Avertissement sécurité Blyssbox', icon: 'fa-shield', color: 'bg-warning' },
    22: { label: 'BOX_REBOOT', icon: 'fa-power-off', color: 'bg-primary' },
    23: { label: 'Alerte brouillage détectée par votre Blyssbox', icon: 'fa-podcast', color: 'bg-danger' }
  };

  constructor(
    private logger: NGXLogger,
    private blyssboxService: BlyssboxService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.isLoggedIn().then(() => this.doRefresh());
  }


  doRefresh() {
    this.history = [];
    this.loading = true;
    this.blyssboxService.getHistory(0, 10, new Date().getTime(), this.currentPage)
      .subscribe(h => {
        this.history = h.history;
        this.totalPage = h.totalPage;
        this.logger.debug('HistoryPageComponent', 'doRefresh', this.history);
        this.refresher.stop();
        this.loading = false;
      });
  }

  getDetail(reason) {
    return this.reasons[ reason ].label;
  }

  getDesc(item) {
    if (item.scenario) {
      return 'Scanario ' + item.name;
    }
    switch(item.origin) {
      case 0:
        if (item.subCategory === 'INTRUSION') {
          return this.desc[ item.subCategory ][ item.state ].replace('{type}', item.name);
        } else {
          return item.name;
        }
      case 4:
        if (item.subCategory === 'INTRUSION') {
          return this.desc[ item.subCategory ][ item.state ].replace('{type}', 'scénario ' + item.name);
        } else {
          return item.name;
        }
      case 1:
        if (item.subCategory === 'INTRUSION') {
          return this.desc[ item.subCategory ][ item.state ].replace('{type}', item.name);
        } else if (item.reason === 7) {
          return item.name;
        } else {
          return item.name;
        }
      default:
        return item.name;
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.doRefresh();
  }
}
