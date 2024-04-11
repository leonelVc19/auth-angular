import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    //guards
    loadChildren: () => import('./auth/auth.module').then( moduleA => moduleA.AuthModule ),
  },
  {
    path: 'dashboard',
    //guards
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then( moduleD => moduleD.DashboardModule ),
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
