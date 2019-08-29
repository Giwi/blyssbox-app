import { Component, OnInit } from '@angular/core';
import { BlyssboxService } from '../services/blyssbox.service';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  history = [];
  totalPage: number;
  currentPage = 0;

  desc = {
    INTRUSION: {
      MOFF: 'Surveillance intrusion désactivée par {type}',
      MON: 'Surveillance intrusion activée par {type}',
      MPR: 'Surveillance intrusion partielle {type}'
    }
  };

  reasons = {
    0: 'DETECTION',
    1: 'Changement de mode:',
    2: 'Reconnexion de votre Blyssbox par liaison GSM',
    3: 'Reconnexion de votre Blyssbox par liaison haut débit',
    4: 'Perte d\'alimentation électrique de votre Blyssbox',
    5: 'Blyssbox de nouveau alimentée',
    6: 'Batterie de votre Blyssbox faible',
    7: 'Batterie faible',
    8: 'Connexion de votre Blyssbox',
    9: 'Déconnexion de votre Blyssbox',
    10: 'Perte de connexion de votre Blyssbox',
    11: 'Erreur système de votre Blyssbox',
    12: 'Accessoire non joignable',
    13: 'Accessoire à nouveau joignable',
    14: 'SCENARIO_ALERT',
    15: 'SCENARIO_KEYPAD',
    16: 'Arrachement',
    17: 'STATE',
    18: 'NODETECT',
    19: 'LIVE_WEB',
    20: 'LIVE_MOBILE',
    21: 'Avertissement sécurité Blyssbox',
    22: 'BOX_REBOOT',
    23: 'Alerte brouillage détectée par votre Blyssbox'
  };

  constructor(private blyssboxService: BlyssboxService,
              private devicesService: DevicesService) {
  }

  ngOnInit() {
    this.doRefresh(undefined);
  }

  getIcon(subCat) {
    switch(subCat) {
      case 'INTRUSION' :
        return 'fa-eye';
      default:
        return 'fa-history';
    }
  }

  doRefresh(event) {
    this.blyssboxService.getHistory(0, 50, new Date().getTime(), this.currentPage)
      .subscribe(h => {
        this.history = h.history;
        this.totalPage = h.totalPage;
        (this.history || []).forEach(fav => console.log(fav));
        if (event) {
          event.target.complete();
        }
      });
  }

  getDetail(reason) {
    return this.reasons[ reason ];
  }

  getDesc(item) {
    if (item.scenario) {
      return 'Scanario ' + item.name;
    }
    switch(item.origin) {
      case 0:
        if (item.subCategory === 'INTRUSION') {
          return this.desc[ item.subCategory ][ item.state ].replace('{type}', item.name);
        }
        break;
      case 4:
        if (item.subCategory === 'INTRUSION') {
          return this.desc[ item.subCategory ][ item.state ].replace('{type}', 'scénario ' + item.name);
        }
        break;
      case 1:
        if (item.subCategory === 'INTRUSION') {
          return this.desc[ item.subCategory ][ item.state ].replace('{type}', item.name);
        } else if (item.reason === 7) {
          return item.name;
        }
        break;
      default:
        return item.name;
    }

  }

}
