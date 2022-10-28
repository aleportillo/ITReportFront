import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import inputs from './inputs';
import pipes from './pipes';
import components from './components';
import { InventoryCardComponent } from './components/inventory-card/inventory-card.component';

@NgModule( {
	declarations : [ ...inputs, ...components, ...pipes, SnackbarComponent, InventoryCardComponent ],
	imports      : [ CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, MatDialogModule, SimplebarAngularModule ],
	exports      : [ ...inputs, ...components, ...pipes, SimplebarAngularModule ]
} )

export class SharedModule { }
