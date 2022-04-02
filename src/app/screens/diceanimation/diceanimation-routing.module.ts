import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiceanimationPage } from './diceanimation.page';

const routes: Routes = [
  {
    path: '',
    component: DiceanimationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiceanimationPageRoutingModule {}
