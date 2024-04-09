import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    //guards
    loadChildren: () => import('./auth/auth.module').then( moduleA => moduleA.AuthModule ),
  },
  {
    path: 'dashboard',
    //guards
    loadChildren: () => import('./dashboard/dashboard.module').then( moduleD => moduleD.DashboardModule ),
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
