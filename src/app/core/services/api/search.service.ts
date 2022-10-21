import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class SearchService {

	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService
	) { }

	search( ) {
		this._helpersService.setTrue( 'search' );
		return this._http.get( API_URL  )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'search' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
}
