import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Injectable( {
	providedIn : 'root'
} )
export class SnackbarService {

	constructor(
		private _snackbar: MatSnackBar
	) { }

	showSnackbar( message: string, type: 'success' | 'warning' | 'error' ){
		let snackbarMessage = message;
		if ( type === 'error' ){
			snackbarMessage = this.getError( message );
		}

		this._snackbar.openFromComponent( SnackbarComponent, {
			data : {
				message,
				action  : 'close',
				type,
				seconds : 6
			},
			panelClass         : type,
			horizontalPosition : 'center',
			verticalPosition   : 'top'
		} );
	}

	getError( message:string ): string{

		return '';
	}
}
