import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private localStorage: LocalStorage) { }

  setItemLocalStorage(index: string, value: any) {
    return this.localStorage.setItem(index, value);
  }

  getItemLocalStorage(index: string) {
    return this.localStorage.getItem(index);
  }

  removeItemLocalStorage(index: string) {
    return this.localStorage.removeItem(index);
  }
}
