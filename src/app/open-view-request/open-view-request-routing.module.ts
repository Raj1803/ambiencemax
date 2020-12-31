import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenViewRequestPage } from './open-view-request.page';

const routes: Routes = [
  {
    path: '',
    component: OpenViewRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenViewRequestPageRoutingModule {}
