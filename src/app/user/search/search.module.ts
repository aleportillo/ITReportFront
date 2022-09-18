import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';


@NgModule( {
	declarations : [SearchComponent],
	imports      : [
		CommonModule,
		SearchRoutingModule,
		RouterModule
	]
} )

export class SearchModule { }
