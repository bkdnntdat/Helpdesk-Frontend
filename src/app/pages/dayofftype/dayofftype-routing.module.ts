import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DayofftypeComponent} from './dayofftype.component';

const routes: Routes = [
   { path: '', component: DayofftypeComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayoffTypeRoutingModule { }
