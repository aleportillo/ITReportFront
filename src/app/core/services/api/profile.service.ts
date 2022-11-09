import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';
import { Admin, IAdmin } from '../../models/admin.model';
import { Router } from '@angular/router';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class ProfileService {

	constructor(
		private _http   : HttpClient,
		private _router: Router,
		private _helpersService : HelpersService
	) { }

	updateData( adminData : IAdmin ) {
		const params : any = { ...adminData };
		params.newPassword = adminData.newPassword ?? null;
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
	
	login( usuario: string, password: string ){

		this._helpersService.setTrue( 'login' );
		return this._http.post( API_URL + `admins/token`, { usuario, password }, { responseType: 'text' } )
			.pipe(
				finalize( () => {
					this._helpersService.setFalse( 'login' );
				} ),
				map( ( data: any )  => {
					localStorage.setItem( 'IT_REPORT_TOKEN', data );
					const defaultAdminID = 1;
					return defaultAdminID;
				} )
			);
	}
	
	isLogged(): boolean {
		return Boolean( localStorage.getItem( 'IT_REPORT_TOKEN' ) );
	}
	
	verifyUser() {
		if ( this.isLogged() ) {
			this.getData().subscribe(
				data => {
					this._helpersService.user$.next( data );
					localStorage.setItem( 'IT_REPORT_NAME', data.nombre );
					this._router.navigate( [`/admin/home`] );
				},
				err => {
					this._router.navigate( [`/admin`] );
				}
			);
		}
	}
	
}
