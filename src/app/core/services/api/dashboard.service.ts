import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dashboard } from '../../models/dashboard.model';
import { HelpersService } from '../internal/helpers.service';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )

export class DashboardService {

	constructor( 
		private _http   : HttpClient,
		private _helpersService : HelpersService 
	) { }
	
	getDashboard( ) {
		this._helpersService.setTrue( 'getDashboard' );
		return this._http.get( API_URL + `reportes/dashboard` )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getDashboard' ) ),
				map( ( data: any ) => {
					return new Dashboard().parse( data || {} );
				} ) 
			);
	}
}
