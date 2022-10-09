import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAreaRoutingModule } from './admin-area-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { SectionRoutingModule } from 'src/app/user/section/section-routing.module';
import { AdminAreaComponent } from './admin-area.component';
import components from '../components';
import { MatMenuModule } from '@angular/material/menu';
@NgModule( {
	declarations : [ AdminAreaComponent, ...components ],
	imports      : [
		CommonModule,
		AdminAreaRoutingModule,
		SectionRoutingModule,
		RouterModule,
		SharedModule,
		MatMenuModule
	]
} )
export class AdminAreaModule { }
