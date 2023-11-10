import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MangeThemeService } from '../../service/mange-theme.service';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/modules/users/service/cart.service';
import { WhishListService } from 'src/app/modules/users/service/whish-list.service';
import { CurentUser } from 'src/app/modules/auth/types/current-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges, OnInit {
  @Input() sideNav!: MatSidenav;
  sideNavbar!: MatSidenav;
  theme!: string;
  isLoggedIn: boolean;
  cartLength: number;
  favoriteLength: number;
  currentUser: CurentUser | null;

  constructor(
    private themeService: MangeThemeService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private whishListService:WhishListService
  ) {
    this.isLoggedIn = false;
    this.cartLength = 0;
    this.favoriteLength = 0;
    this.currentUser = null;
  }

  ngOnChanges(): void {
    this.sideNavbar = this.sideNav;
  };

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe({
      next: (val) => {
        if (val) {
          this.theme = 'brightness_high';
        } else {
          this.theme = 'brightness_2';
        }
      },
    });

    this.authService.getLoggedIn().subscribe({
      next: (status) => {
        this.isLoggedIn = status
      }
    });

    this.cartService.getCartLength().subscribe({
      next: (val) => {
        this.cartLength = val;
        this.cartService.getUserCart()
      }
    });

    this.whishListService.getFavoriteLength().subscribe({
      next: (value) => {
        this.favoriteLength = value;
      }
    });

    this.authService.getLoggedUser().subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  };

  changeTheme(): void {
    this.themeService.toggleDarkMode();
  };

  logOut():void {
    this.authService.logOut();
    this.router.navigate([""]);
  };
}
