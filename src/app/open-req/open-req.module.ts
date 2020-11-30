import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenReqPageRoutingModule } from './open-req-routing.module';

import { OpenReqPage } from './open-req.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenReqPageRoutingModule
  ],
  declarations: [OpenReqPage]
})
export class OpenReqPageModule {}
