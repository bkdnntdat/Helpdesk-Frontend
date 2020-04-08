import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillRoutingModule} from './skill-routing.module';
import {SkillComponent} from './skill.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {NgZorroAntdModule, NzPopconfirmModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [SkillComponent],
  imports: [CommonModule, SkillRoutingModule, SharedModule, NzPopconfirmModule, NgZorroAntdModule],
  exports: [SkillComponent],
})
export class SkillModule {
}
