import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBackendRoom, Room, SaveRoom } from '../../models/inventory/room.model';
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
	
	getRooms(){
		this._helpersService.setTrue( 'getRooms' );
		return this._http.get( API_URL + 'salas' )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getRooms' ) ),
				map( ( data : any ) => {
					console.log(data);
					return ( data || [] ).map( ( room: IBackendRoom ) => new Room().parse( room ) );
				} )
			);
	}
	
}
