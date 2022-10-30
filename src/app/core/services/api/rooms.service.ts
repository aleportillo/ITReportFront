import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaveRoom } from '../../models/inventory/room.model';
import { HelpersService } from '../internal/helpers.service';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class RoomsService {
	
	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService 
	) { }
	
	saveElement( room: SaveRoom ){
		this._helpersService.setTrue( 'saveRoom' );
		return this._http.post( API_URL + `salas`, room )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'saveRoom' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
}
