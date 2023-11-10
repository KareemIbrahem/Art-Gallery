import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-lay-out',
  templateUrl: './main-lay-out.component.html',
  styleUrls: ['./main-lay-out.component.scss']
})
export class MainLayOutComponent {
  sideNav!: MatSidenav;
  constructor(){}

  onEventEmit(event: MatSidenav) {
    this.sideNav = event;
  }
}
