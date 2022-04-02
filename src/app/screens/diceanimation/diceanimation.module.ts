import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiceanimationPageRoutingModule } from './diceanimation-routing.module';

import { DiceanimationPage } from './diceanimation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiceanimationPageRoutingModule
  ],
  declarations: [DiceanimationPage]
})
export class DiceanimationPageModule {}
