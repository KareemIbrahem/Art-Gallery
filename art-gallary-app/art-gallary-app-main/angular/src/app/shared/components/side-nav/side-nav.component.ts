import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CurentUser } from 'src/app/modules/auth/types/current-user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  @Output() sideNavEvent!: EventEmitter<MatSidenav>;

  isLoggedIn: boolean;
  currentUser: CurentUser | null;
  userImg: string;

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService
  ) {
    this.sideNavEvent = new EventEmitter<MatSidenav>();
    this.isLoggedIn = false;
    this.currentUser = null;
    this.userImg = "assets/user.webp";
  }

  ngOnInit(): void {
    this.authService.getLoggedIn().subscribe({
      next: (status) => {
        this.isLoggedIn = status;
      }
    });

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.currentUser = user;
          if (this.currentUser.data.userImg != "" ) {
            this.userImg = this.currentUser.data.userImg|| "assets/user.webp";
          }

        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
        this.sideNavEvent.emit(this.sideNav);
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
        this.sideNavEvent.emit(this.sideNav);
      }
    });
  }
}
