import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule( {
	declarations : [],
	imports      : [CommonModule],
	exports      : [
		MatProgressBarModule, 
		MatSelectModule
	]
} )
export class MaterialModule { }
