import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayofftypeComponent } from './dayofftype.component';
import { DayoffTypeRoutingModule } from './dayofftype-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DayofftypeComponent],
  imports: [
    CommonModule,
    SharedModule,
    DayoffTypeRoutingModule
  ],
  exports:[DayofftypeComponent]
})
export class DayofftypeModule { }
