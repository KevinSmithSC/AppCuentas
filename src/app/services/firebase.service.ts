import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth'
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  // =============ACCEDER
  login(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

    //=========RESTABLECER CONTRASEÑA=========
sendRecoveryEmail(email: string){
  return sendPasswordResetEmail(getAuth(), email)
  }

  // BD
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //==================CERRAR SESION========
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/login')
  }
}
