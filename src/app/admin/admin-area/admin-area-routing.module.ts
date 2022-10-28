import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AdminAreaComponent } from './admin-area.component';

const routes: Routes = [
	{
		path      : '',
		component : AdminAreaComponent
	},
	{
		path      : 'login',
		component : LoginComponent
	}
];

@NgModule( {
	imports : [RouterModule.forChild( routes )],
	exports : [RouterModule]
} )
export class AdminAreaRoutingModule { }
