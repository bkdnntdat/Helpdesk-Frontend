import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DayoffComponent} from './dayoff.component';

const routes: Routes = [
   { path: '', component: DayoffComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayoffRoutingModule { }
