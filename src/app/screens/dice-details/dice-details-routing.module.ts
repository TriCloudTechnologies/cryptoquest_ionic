import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiceDetailsPage } from './dice-details.page';

const routes: Routes = [
  {
    path: '',
    component: DiceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiceDetailsPageRoutingModule {}