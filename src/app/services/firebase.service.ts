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
  saldoDoc;
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


  //------PARTE DE MARI//
  getSaldo() {
    return this.saldoDoc.valueChanges();
  }

  updateSaldo(nuevoSaldo: number) {
    return this.saldoDoc.update({ monto: nuevoSaldo });
  }

  agregarIngreso(monto: number) {
    return this.firestore.collection('ingresos').add({ monto, fecha: new Date() });
  }

  agregarGasto(monto: number) {
    return this.firestore.collection('gastos').add({ monto, fecha: new Date() });
  }


  //==================CERRAR SESION========
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/login')
  }
}
