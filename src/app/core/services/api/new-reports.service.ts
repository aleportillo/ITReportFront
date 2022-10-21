import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class NewReportsService {

	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService
	) { }

	getReports( ) {
		this._helpersService.setTrue( 'getNewReports' );
		return this._http.get( API_URL, {} )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getNewReports' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}

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
