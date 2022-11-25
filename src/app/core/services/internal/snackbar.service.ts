import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

const ERRORS : any = {
	GET_REPORTS          : 'Hubo un problema al cargar los reportes, inténtalo de nuevo más tarde.',
	SAVE_REPORT          : 'Hubo un error al guardar tu reporte, inténtalo de nuevo más tarde.',
	REPORT_ACCEPT        : 'Hubo un error al aceptar el reporte, inténtalo de nuevo más tarde.',
	SAVE_COMPONENT       : 'Hubo un error al guardar el componente, inténtalo de nuevo más tarde.',
	SAVE_COMPUTER        : 'Hubo un error al guardar la computadora, inténtalo de nuevo más tarde.',
	SAVE_ROOM            : 'Hubo un error al guardar la sala, inténtalo de nuevo más tarde.',
	SEARCH               : 'No se encontraron elementos, revisa los parámetros de búsqueda.',
	UPDATE_PROFILE       : 'Hubo un problema al actualizar el perfil, inténtalo de nuevo más tarde.',
	GET_PROFILE          : 'Hubo un problema al obtener el perfil, inténtalo de nuevo más tarde.',
	MULTIPLE_SEARCH      : 'Hay múltiples resultados con los parámetros introducidos, sé más específico.',
	ERR_PASSWORD         : 'La contraseña es incorrecta',
	LOAD_FORM            : 'Hubo un problema al cargar el formulario, inténtalo de nuevo más tarde.',
	GET_INVENTORY_ITEMS  : 'Hubo un error al cargar los elementos, inténtalo de nuevo más tarde.',
	ERR_GET_ROOMS        : 'Hubo un error al cargar las salas, inténtalo de nuevo más tarde.',
	ERR_GET_PC           : 'Hubo un error al cargar las computadoras, inténtalo de nuevo más tarde.',
	ERR_GET_REPORTS      : 'Hubo un error al cargar los reportes, inténtalo de nuevo más tarde.',
	ERR_GET_DASHBOARD    : 'Hubo un error al cargar el dashboard, inténtalo de nuevo más tarde.',
	ERR_GET_COMPONENTS   : 'Hubo un error al cargar los componentes, inténtalo de nuevo más tarde.',
	ERR_DELETE_COMPONENT : 'Hubo un error al eliminar el componente, inténtalo de nuevo más tarde.',
	ERR_DELETE_COMPUTER  : 'Hubo un error al eliminar la computadora, inténtalo de nuevo más tarde.',
	ERR_DELETE_ROOM      : 'Hubo un error al eliminar la sala, inténtalo de nuevo más tarde.',
	ERR_DELETE_REPORT    : 'Hubo un error al descartar el reporte, inténtalo de nuevo más tarde.',
	COMPONENT_DUPLICATE  : 'Ya hay un componente con ese número',
	PC_DUPLICATE         : 'Ya hay una computadora con ese número',
	ROOM_DUPLICATE       : 'Ya hay una sala con ese número'
};

const ALL_MESSAGES : any = {
	SAVE_REPORT_USER  : 'Tu reporte se ha enviado al departamento de sistemas.',
	SAVE_REPORT       : 'El reporte se ha guardado correctamente',
	SAVE_PROFILE      : 'El perfil se ha guardado correctamente',
	REPORT_ACCEPT     : 'El reporte ha sido aceptado correctamente',
	SAVE_COMPONENT    : 'El reporte se ha guardado correctamente',
	SAVE_COMPUTER     : 'La computadora se ha guardado correctamente',
	SAVE_ROOM         : 'La sala se ha guardado correctamente',
	DELETE_COMPONENT  : 'El componente se eliminó correctamente',
	DELETE_COMPUTER   : 'La computadora se eliminó correctamente',
	DELETE_ROOM       : 'La sala se eliminó correctamente',
	DELETE_REPORT     : 'El reporte se descartó correctamente',
	PC_HAS_COMPONENTS : 'No es posible eliminar la computadora, ya que aún tiene componentes asociados',
	ROOM_HAS_PC       : 'No es posible eliminar la sala, porque aún tiene computadoras asociadas'
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
		} else {
			snackbarMessage = this.getMessage( message );
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
	
	getMessage( message:string ): string{
		return ALL_MESSAGES[message];
	}
}
