import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class ActiveReportsService {

	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService
	) { }

	getReports( ) {
		this._helpersService.setTrue( 'getActiveReports' );
		return this._http.get( API_URL, {} )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getActiveReports' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}

	// TODO CHECK
	updateReport( section: string ) {
		this._helpersService.setTrue( section );
		return this._http.put( API_URL, {} )
			.pipe(
				finalize( () => this._helpersService.setFalse( section ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
}
