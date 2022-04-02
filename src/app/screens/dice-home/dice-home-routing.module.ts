import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiceHomePage } from './dice-home.page';

const routes: Routes = [
  {
    path: '',
    component: DiceHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiceHomePageRoutingModule {}
