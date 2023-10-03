import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'employees',
  loadChildren: () => import('./modules/employees/employees.module')
    .then(m => m.EmployeesModule)
}, {
  path: 'templates',
  loadChildren: () => import('./modules/templates/templates.module')
    .then(m => m.TemplatesModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
