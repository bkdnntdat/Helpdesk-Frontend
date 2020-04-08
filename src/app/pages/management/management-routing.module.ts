import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from '../management/management.component';
import { AuthGuardService } from '../management/service/auth-guard/auth-guard.service';
const routes: Routes = [
    {
        path: '',
        component: ManagementComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagementRoutingModule { }
