import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeDetailPage } from './code-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CodeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeDetailPageRoutingModule {}
