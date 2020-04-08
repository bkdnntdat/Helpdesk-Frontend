import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestTypeComponent } from './request-type.component';
import { RequestTypeRoutingModule } from './request-type-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [RequestTypeComponent],
  imports: [
    CommonModule,
    RequestTypeRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    NzModalModule,
    NzIconModule
  ],
  exports: [RequestTypeComponent]
})
export class RequestTypeModule {}
