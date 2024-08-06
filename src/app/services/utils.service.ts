import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadinCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router)


  // ============== Loading ================
  loading() {
    return this.loadinCtrl.create({ spinner: 'circular' })
  }

  // ====== Toas =====

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }


  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }


  // ===== Guardar un elemento en localstorage ====

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }


  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
