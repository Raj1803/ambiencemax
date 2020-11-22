import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllRequestPageRoutingModule } from './all-request-routing.module';

import { AllRequestPage } from './all-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllRequestPageRoutingModule
  ],
  declarations: [AllRequestPage]
})
export class AllRequestPageModule {}
