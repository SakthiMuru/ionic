import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations:[InputComponent],
  imports:[CommonModule,IonicModule,FormsModule,ReactiveFormsModule],
  exports:[InputComponent]
  
})
export class InputModule {
}
