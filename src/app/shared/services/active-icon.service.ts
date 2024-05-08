import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActiveIconService {
  private _activeIcon: string = '';
  private _activeHomePage: string = 'posts';
  constructor() {}

  getActiveIcon(): string {
    return this._activeIcon;
  }

  setActiveIcon(iconName: string) {
    this._activeIcon = iconName;
  }
  getActiveHomePage(): string {
    return this._activeHomePage;
  }
  setActiveHomePage(homePage: string) {
    this._activeHomePage = homePage;
  }
}
