import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayoffRoutingModule } from './dayoff-routing.module';
import {DayoffComponent} from './dayoff.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { from } from 'rxjs';


@NgModule({
  declarations: [DayoffComponent],
  imports: [
    CommonModule,
    DayoffRoutingModule,
    SharedModule
  ],
  exports:[DayoffComponent]
    
})
export class DayoffModule { }
