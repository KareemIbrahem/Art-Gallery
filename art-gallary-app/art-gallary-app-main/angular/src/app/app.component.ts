import { Component, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { OverlayContainer } from "@angular/cdk/overlay";
import { MangeThemeService } from "./shared/service/mange-theme.service";
import { AuthService } from "./modules/auth/service/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  isDarkMode!: Boolean;

  constructor(
    private manageTheme: MangeThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.manageTheme.darkMode$.subscribe({
      next: (val) => {
        this.isDarkMode = val;
        const themeClass = this.isDarkMode ? "theme-dark" : "theme-light";
        const body = document.getElementsByTagName("body")[0];
        body.className = themeClass;
      },
    });
    this.authService.getLoggedUser().subscribe({
      next: (user) => {
        this.authService.setCurrentUser(user);
      },
    });
  }
}
