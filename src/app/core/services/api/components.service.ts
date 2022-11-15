import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComponentItem, IBackendComponentItem, SaveComponentItem } from '../../models/inventory/component.model';
import { HelpersService } from '../internal/helpers.service';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class ComponentsService {

	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService 
	) { }
	
	saveElement( component: SaveComponentItem ){
		this._helpersService.setTrue( 'saveComponent' );
		return this._http.post( API_URL + `componentes`, component )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'saveComponent' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
	
	getComponents(){
		this._helpersService.setTrue( 'getComponents' );
		return this._http.get( API_URL + 'Componentes' )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getComponents' ) ),
				map( ( data : any ) => {
					console.log( data );
					// return [];
					return ( data || [] ).map( ( component: IBackendComponentItem ) => new ComponentItem().parse( component ) );
				} )
			);
	}
	
	// updateRoom( roomId: number, room: SaveRoom ){
	// 	this._helpersService.setTrue( 'saveRoom' );
	// 	return this._http.put( API_URL + `salas/${ roomId }`, room )
	// 		.pipe(
	// 			finalize( () => this._helpersService.setFalse( 'saveRoom' ) ),
	// 			map( ( data: any ) => {
	// 				return data;
	// 			} ) 
	// 		);
	// }
	
}
