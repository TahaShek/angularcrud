import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModuleComponent } from './main-module.component';
import { AnalyticsComponent } from './mainComponent/analytics/analytics.component';
import { GetComponent } from './mainComponent/get/get.component';
import { TestingComponent } from './mainComponent/testing/testing.component';

const routes: Routes = [{ path: '', component: MainModuleComponent,children:[
  {path:"",component:TestingComponent},
  {path:"testing",component:TestingComponent},
  {path:"get",component:GetComponent},
  {path:"analytics",component:AnalyticsComponent},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
