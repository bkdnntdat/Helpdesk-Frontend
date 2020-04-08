import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestUserComponent } from './request-user.component';
const routes: Routes = [
    {
        path: '',
        component: RequestUserComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestUserRoutingModule { }
