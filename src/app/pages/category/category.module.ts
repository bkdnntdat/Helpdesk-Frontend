import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import {CategoryComponent} from './category.component';
import {CategoryRoutingModule} from './category-routing.module';
import {NzPopconfirmModule} from 'ng-zorro-antd';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule,
    NzPopconfirmModule,
    NzDividerModule
  ],
  exports: [CategoryComponent]
})
export class CategoryModule {
}
