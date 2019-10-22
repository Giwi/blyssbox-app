import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-refresh-title',
  templateUrl: './refresh-title.component.html',
  styleUrls: ['./refresh-title.component.scss']
})
export class RefreshTitleComponent implements OnInit {
  @Output() onRefresh = new EventEmitter<any>();

  @Input()
  public stop() {
    this.loading = false;
  }

  loading = false;

  constructor() {
  }

  ngOnInit() {
  }

  onClick($event: MouseEvent) {
    this.loading = true;
    this.onRefresh.emit($event);
  }
}
