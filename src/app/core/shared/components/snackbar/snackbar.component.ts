import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

const MILISECONDS = 1000;

@Component( {
	selector    : 'app-snackbar',
	templateUrl : './snackbar.component.html',
	styleUrls   : ['./snackbar.component.css']
} )
export class SnackbarComponent implements OnInit {

	constructor(
		@Inject( MAT_SNACK_BAR_DATA ) public data: {
			action: string;
			message: string;
			seconds: number;
			type: 'success' | 'warning' | 'danger';
		},
		private _snackRef: MatSnackBarRef<SnackbarComponent>
	) { }

	ngOnInit(): void {
		setTimeout( () => {
			this._snackRef.dismiss();
		}, this.data.seconds * MILISECONDS );
	}

	// -------------------------------------------------- ANCHOR: TOOLS
	
	action() {
		if ( this.data.action.toUpperCase() === 'CLOSE' ) {
			this._snackRef.dismiss();
		}
	}


}
