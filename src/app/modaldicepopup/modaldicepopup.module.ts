import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModaldicepopupPageRoutingModule } from './modaldicepopup-routing.module';

import { ModaldicepopupPage } from './modaldicepopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModaldicepopupPageRoutingModule
  ],
  declarations: [ModaldicepopupPage]
})
export class ModaldicepopupPageModule {}