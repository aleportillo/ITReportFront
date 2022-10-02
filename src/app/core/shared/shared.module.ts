import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import inputs from './inputs';
import components from './components';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';
import pipes from './pipes';

@NgModule( {
	declarations : [ ...inputs, ...components, ...pipes ],
	imports      : [ CommonModule, MaterialModule, FormsModule, ReactiveFormsModule ],
	exports      : [ ...inputs, ...components, ...pipes, SimplebarAngularModule ]
} )

export class SharedModule { }
