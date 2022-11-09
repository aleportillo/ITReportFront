import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth/auth.guard';
import { LoginComponent } from '../login/login.component';
import { AdminAreaComponent } from './admin-area.component';

const routes: Routes = [
	{
		path        : 'home',
		component   : AdminAreaComponent,
		canActivate : [AuthGuard]
	},
	{
		path      : '',
		component : LoginComponent
	}
];

@NgModule( {
	imports : [RouterModule.forChild( routes )],
	exports : [RouterModule]
} )
export class AdminAreaRoutingModule { }
