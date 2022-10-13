import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAreaRoutingModule } from './admin-area-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { SectionRoutingModule } from 'src/app/user/section/section-routing.module';
import { AdminAreaComponent } from './admin-area.component';
import components from '../components';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from '../profile/profile.component';
import { ActiveReportsComponent } from '../active-reports/active-reports.component';
import { NewReportsComponent } from '../new-reports/new-reports.component';
@NgModule( {
	declarations : [ AdminAreaComponent, ...components, ProfileComponent, ActiveReportsComponent, NewReportsComponent ],
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
