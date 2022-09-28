import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path         : '',
		loadChildren : () => import( './user/search/search.module' ).then( module => module.SearchModule )
	},
	{
		path         : 'sala/:id',
		loadChildren : () => import( './user/section/section.module' ).then( module => module.SectionModule )
	},
	{
		path         : 'computadora/:id',
		loadChildren : () => import( './user/section/section.module' ).then( module => module.SectionModule )
	},
	{
		path       : '**',
		redirectTo : ''
	}
];

@NgModule( {
	imports : [RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } )],
	exports : [RouterModule]
} )
export class AppRoutingModule { }
