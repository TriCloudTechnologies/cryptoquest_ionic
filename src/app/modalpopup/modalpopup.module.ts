import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalpopupPageRoutingModule } from './modalpopup-routing.module';
import{NgOtpInputModule} from "ng-otp-input"
import { ModalpopupPage } from './modalpopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgOtpInputModule,
    ModalpopupPageRoutingModule
  ],
  declarations: [ModalpopupPage]
})
export class ModalpopupPageModule {}
