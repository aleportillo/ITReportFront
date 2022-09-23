import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule( {
	declarations : [SearchComponent],
	imports      : [
		CommonModule,
		SearchRoutingModule,
		RouterModule,
		SharedModule
	]
} )

export class SearchModule { }
