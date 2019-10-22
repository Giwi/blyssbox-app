import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-battery-level',
  templateUrl: './battery-level.component.html',
  styleUrls: ['./battery-level.component.scss']
})
export class BatteryLevelComponent implements OnInit {
  @Input() level: number;

  constructor() {
  }

  ngOnInit() {
  }

  getBatIcon() {
    if (this.level > 75) {
      return 'fa-battery-4';
    }
    if (this.level > 50 && this.level <= 75) {
      return 'fa-battery-3';
    }
    if (this.level > 25 && this.level <= 50) {
      return 'fa-battery-2';
    }
    if (this.level <= 25) {
      return 'fa-battery-1';
    }
  }

  getColor(level) {
    if (level < 25) {
      return 'text-danger';
    } else if (level < 50) {
      return 'text-warning';
    } else {
      return 'text-success';
    }
  }
}
