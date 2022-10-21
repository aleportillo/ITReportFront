import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class SectionService {

	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService
	) { }

	saveReport( ) {
		this._helpersService.setTrue( 'createReport' );
		return this._http.post( API_URL, {} )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'createReport' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}

	getReports( ) {
		this._helpersService.setTrue( 'getUserReports' );
		return this._http.get( API_URL, {} )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getUserReports' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}

}
