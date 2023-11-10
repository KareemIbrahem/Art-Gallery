import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangeThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    const isDark = JSON.parse(localStorage.getItem("theme")!);
    this.darkModeSubject.next(isDark);
  }

  public toggleDarkMode():void {
    const darkMode = !this.darkModeSubject.getValue();
    this.darkModeSubject.next(darkMode);
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }
}
