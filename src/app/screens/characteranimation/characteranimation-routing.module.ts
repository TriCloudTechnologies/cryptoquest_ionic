import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacteranimationPage } from './characteranimation.page';

const routes: Routes = [
  {
    path: '',
    component: CharacteranimationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacteranimationPageRoutingModule {}
