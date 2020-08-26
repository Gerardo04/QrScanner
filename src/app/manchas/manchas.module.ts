import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManchasPageRoutingModule } from './manchas-routing.module';

import { ManchasPage } from './manchas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManchasPageRoutingModule
  ],
  declarations: [ManchasPage]
})
export class ManchasPageModule {}
