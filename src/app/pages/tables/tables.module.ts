import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables.component';
import { StudentsComponent } from './components/students/students.component';
import { SchoolComponent } from './components/school/school.component';
import {MaterialModule} from 'src/app/modules/material/material.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    TablesComponent, 
    StudentsComponent, 
    SchoolComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
})
export class TablesModule{ }
