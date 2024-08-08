import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  saldoActual: number = 0;
  segmento: string = 'Ingreso';
  monto: number;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getSaldo().subscribe((saldo: any) => {
      this.saldoActual = saldo?.monto || 0;
    });
  }

  segmentoCambiado() {
    this.monto = null;
  }

  agregarIngreso() {
    if (this.monto && this.monto > 0) {
      this.firebaseService.agregarIngreso(this.monto).then(() => {
        this.firebaseService.updateSaldo(this.saldoActual + this.monto);
        this.monto = null;
      });
    }
  }

  agregarGasto() {
    if (this.monto && this.monto > 0) {
      this.firebaseService.agregarGasto(this.monto).then(() => {
        this.firebaseService.updateSaldo(this.saldoActual - this.monto);
        this.monto = null;
      });
    }
  }

}
