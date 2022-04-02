import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiceHomePageRoutingModule } from './dice-home-routing.module';

import { DiceHomePage } from './dice-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiceHomePageRoutingModule,
 
  ],
  declarations: [DiceHomePage]
})
export class DiceHomePageModule {}