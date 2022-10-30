import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaveComputer } from '../../models/inventory/computer.model';
import { HelpersService } from '../internal/helpers.service';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class ComputersService {

	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService 
	) { }
	
	saveElement( component: SaveComputer ){
		this._helpersService.setTrue( 'saveComputer' );
		return this._http.post( API_URL + `computadoras`, component )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'saveComputer' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
	
}
