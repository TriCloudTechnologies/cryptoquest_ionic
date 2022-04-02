import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModaldicepopupPage } from './modaldicepopup.page';

const routes: Routes = [
  {
    path: '',
    component: ModaldicepopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModaldicepopupPageRoutingModule {}