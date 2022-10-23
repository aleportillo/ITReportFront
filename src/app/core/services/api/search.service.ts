import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

	search( params : { type: string; textSearch: string } ) {
		this._helpersService.setTrue( 'search' );
		return this._http.post( API_URL + `${ params.type }s/search`, { value: params.textSearch } )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'search' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
}
