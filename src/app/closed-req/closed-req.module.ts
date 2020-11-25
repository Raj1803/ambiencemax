import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClosedReqPageRoutingModule } from './closed-req-routing.module';

import { ClosedReqPage } from './closed-req.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClosedReqPageRoutingModule
  ],
  declarations: [ClosedReqPage]
})
export class ClosedReqPageModule {}
