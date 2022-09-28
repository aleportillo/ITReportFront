import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { SectionComponent } from './section.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule( {
	declarations : [SectionComponent],
	imports      : [
		CommonModule,
		SectionRoutingModule,
		RouterModule,
		SharedModule
	]
} )
export class SectionModule { }
