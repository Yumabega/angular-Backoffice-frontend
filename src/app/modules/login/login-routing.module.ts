import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionComponent } from '@modules/recepcion/recepcion.component';
import { AuthorizatedGuard } from 'app/guards/authentication/authorizated.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: 'home', component: RecepcionComponent, canActivate: [AuthorizatedGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
