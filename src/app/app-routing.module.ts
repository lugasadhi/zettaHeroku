import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import {TablesComponent} from './pages/tables/tables.component';
// import {DetailComponent} from './pages/detail/detail.component'

const routes: Routes = [
  { 
    path: 'table', 
    component: TablesComponent,
  },
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  }, 
];
const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [  RouterModule.forRoot(routes, config) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }