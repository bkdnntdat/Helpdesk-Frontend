import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRequestComponent } from './admin-request.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: AdminRequestComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRequestRoutingModule { }
