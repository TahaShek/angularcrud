import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModuleComponent } from './main-module.component';
import { GetComponent } from './mainComponent/get/get.component';
import { TestingComponent } from './mainComponent/testing/testing.component';

const routes: Routes = [{ path: '', component: MainModuleComponent,children:[
  {path:"",component:TestingComponent},
  {path:"testing",component:TestingComponent},
  {path:"get",component:GetComponent},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
