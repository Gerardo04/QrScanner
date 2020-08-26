import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManchasPage } from './manchas.page';

const routes: Routes = [
  {
    path: '',
    component: ManchasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManchasPageRoutingModule {}
