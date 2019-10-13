import { Component, OnInit } from '@angular/core';
import { BlyssboxService } from '../services/blyssbox.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites = [];

  constructor(private blyssboxService: BlyssboxService) {
  }

  ngOnInit() {
    this.doRefresh(undefined);
  }

  run(serial: number) {
    this.blyssboxService.setFavoriteStart(serial).subscribe(() => this.doRefresh(undefined));
  }

  doRefresh(event) {
    this.blyssboxService.getFavorites().subscribe(f => {
      this.favorites = f;
      (f || []).forEach(fav => console.log(fav));
      if (event) {
        event.target.complete();
      }
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
