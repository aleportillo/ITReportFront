import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAreaComponent } from './admin-area.component';

const routes: Routes = [
	{
		path      : '',
		component : AdminAreaComponent
	}
];

@NgModule( {
	imports : [RouterModule.forChild( routes )],
	exports : [RouterModule]
} )
export class AdminAreaRoutingModule { }
