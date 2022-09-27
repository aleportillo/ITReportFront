import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import inputs from './inputs';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule( {
	declarations : [...inputs],
	imports      : [ CommonModule, MaterialModule, FormsModule, ReactiveFormsModule ],
	exports      : [...inputs]
} )

export class SharedModule { }
