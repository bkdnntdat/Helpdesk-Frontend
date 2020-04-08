import { NgModule } from "@angular/core";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  imports: [LoginRoutingModule, NzMessageModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {}
