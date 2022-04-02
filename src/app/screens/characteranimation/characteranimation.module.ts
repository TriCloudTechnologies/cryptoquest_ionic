import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacteranimationPageRoutingModule } from './characteranimation-routing.module';

import { CharacteranimationPage } from './characteranimation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacteranimationPageRoutingModule
  ],
  declarations: [CharacteranimationPage]
})
export class CharacteranimationPageModule {}
