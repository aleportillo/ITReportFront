import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaveComponent } from '../../models/inventory/component.modal';
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
	
	saveElement( component: SaveComponent ){
		this._helpersService.setTrue( 'saveComponent' );
		return this._http.post( API_URL + `componentes`, component )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'saveComponent' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
	
}
