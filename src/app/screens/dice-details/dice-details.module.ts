import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiceDetailsPageRoutingModule } from './dice-details-routing.module';

import { DiceDetailsPage } from './dice-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiceDetailsPageRoutingModule
  ],
  declarations: [DiceDetailsPage]
})
export class DiceDetailsPageModule {}