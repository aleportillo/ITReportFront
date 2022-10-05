import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';
import { MatDialogModule } from '@angular/material/dialog';
import inputs from './inputs';
import pipes from './pipes';
import components from './components';

@NgModule( {
	declarations : [ ...inputs, ...components, ...pipes ],
	imports      : [ CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, MatDialogModule ],
	exports      : [ ...inputs, ...components, ...pipes, SimplebarAngularModule ]
} )

export class SharedModule { }
