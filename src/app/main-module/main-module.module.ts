import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { MainModuleComponent } from './main-module.component';
import { HeaderComponent } from './mainComponent/header/header.component';
import { TestingComponent } from './mainComponent/testing/testing.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetComponent } from './mainComponent/get/get.component';
import { AnalyticsComponent } from './mainComponent/analytics/analytics.component';



@NgModule({
  declarations: [
    MainModuleComponent,
    HeaderComponent,
    TestingComponent,
    GetComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModuleModule { }
