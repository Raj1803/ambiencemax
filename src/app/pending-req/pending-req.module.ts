import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingReqPageRoutingModule } from './pending-req-routing.module';

import { PendingReqPage } from './pending-req.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingReqPageRoutingModule
  ],
  declarations: [PendingReqPage]
})
export class PendingReqPageModule {}
