import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

const ERRORS : any = {
	GET_REPORTS : 'Hubo un problema al cargar los reportes, inténtalo de nuevo más tarde.',
	SAVE_REPORT : 'Hubo un error al guardar tu reporte, inténtalo de nuevo más tarde.',
	SEARCH      : 'No se encontraron elementos, revisa los parámetros de búsqueda.'
};

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
				message : snackbarMessage,
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
		return ERRORS[message] ?? 'Hubo un error';
	}
}
