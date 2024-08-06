import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './components/custom-input/custom-input.component';



@NgModule({
  declarations: [
    CustomInputComponent
  ],
  exports: [
    CustomInputComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
