import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import inputs from './inputs';
import { MaterialModule } from 'src/app/material.module';

@NgModule( {
	declarations : [...inputs],
	imports      : [ CommonModule, MaterialModule ],
	exports      : [...inputs]
} )

export class SharedModule { }
