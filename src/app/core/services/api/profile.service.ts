import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';
import { Admin, IAdmin } from '../../models/admin.model';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class ProfileService {

	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService
	) { }

	updateData( adminData : IAdmin ) {
		this._helpersService.setTrue( 'saveProfile' ); 
		return this._http.put( API_URL + `admins/1`, { ...adminData } )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'saveProfile' ) ),
				map( ( data: any ) => {
					return new Admin().parse( data );
				} ) 
			);
	}

	getData( ) {
		this._helpersService.setTrue( 'getProfile' );
		return this._http.get( API_URL + `admins/1` )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getProfile' ) ),
				map( ( data : any ) => {
					return new Admin().parse( data );
				} ) 
			);
	}
}
