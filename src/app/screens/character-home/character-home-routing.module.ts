import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterHomePage } from './character-home.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterHomePageRoutingModule {}
