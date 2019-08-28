import { Component, OnInit } from '@angular/core';
import { BlyssboxService } from '../services/blyssbox.service';

@Component({
  selector: 'app-openings',
  templateUrl: './openings.page.html',
  styleUrls: ['./openings.page.scss'],
})
export class OpeningsPage implements OnInit {
  openings = [];

  constructor(private blyssboxService: BlyssboxService) {
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
      .subscribe(() => this.blyssboxService.getFavorites()
        .subscribe(f => this.openings = f));
  }

  runToggle(serial: string) {
    this.blyssboxService.setDeviceStatus(serial, 'TOGGLE')
      .subscribe(() => this.blyssboxService.getFavorites()
        .subscribe(f => this.openings = f));
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

  doRefresh(event) {
    this.blyssboxService.getDevices('OPENINGS', 'SHUTTERS')
      .subscribe(f => {
        this.openings = f;
        (f || []).forEach(fav => console.log(fav));
        if (event) {
          event.target.complete();
        }
      });
  }
}
