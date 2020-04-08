import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './material.module';
import { NzFormModule } from 'ng-zorro-antd';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: 
  [TimeAgoPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzBadgeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NzBadgeModule,
    FlexLayoutModule,
    TimeAgoPipe
  ]
})
export class SharedModule { }
