import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeDetailPageRoutingModule } from './code-detail-routing.module';

import { CodeDetailPage } from './code-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeDetailPageRoutingModule
  ],
  declarations: [CodeDetailPage]
})
export class CodeDetailPageModule {}
