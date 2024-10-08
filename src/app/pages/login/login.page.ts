import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }
  


  async submit(){
    if (this.form.valid){
      
      const loading = await this.utilsSvc.loading();
      await loading.present();



      this.firebaseSvc.login(this.form.value as User).then(res => {

      this.getUserInfo(res.user.uid);

      }).catch(error => {

        console.log(error);

        this.utilsSvc.presentToast({
          message: "Correo o contraseña incorrecta",
          duration: 2500,
          color: "primary",
          position: "bottom",
          icon: "alert-circle-outline"
        })

      }).finally(() => {

        loading.dismiss();

      })
    }

}


async getUserInfo(uid: string){
  if (this.form.valid){
    
    const loading = await this.utilsSvc.loading();
    await loading.present();

    let path = `users/${uid}`;

    this.firebaseSvc.getDocument(path).then((user: User ) => {

      this.utilsSvc.saveInLocalStorage('user', user);
      this.utilsSvc.routerLink('main');
      this.form.reset();

        // BANNER
      this.utilsSvc.presentToast({
        message: `Te damos la bienvenida`,
        duration: 1500,
        color: 'primary',
        position: 'middle',
      })

    }).catch(error => {
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2000,
        color:'primary',
        position: 'bottom',
        icon:'alert-circle-outline'
      })

    }).finally(() => {
      loading.dismiss();
    })
  }
}

}