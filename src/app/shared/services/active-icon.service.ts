import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveIconService {
  private _activeIcon: string = '';
  constructor() { }


  getActiveIcon(): string {
    return this._activeIcon;
  }

  setActiveIcon(iconName: string) {
    this._activeIcon = iconName;
  }
}
