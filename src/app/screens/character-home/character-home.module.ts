import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterHomePageRoutingModule } from './character-home-routing.module';

import { CharacterHomePage } from './character-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterHomePageRoutingModule,
  ],
  declarations: [CharacterHomePage],
})
export class CharacterHomePageModule {}
