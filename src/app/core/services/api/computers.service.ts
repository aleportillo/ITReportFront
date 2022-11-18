import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Computer, IBackendComputer, SaveComputer } from '../../models/inventory/computer.model';
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
		return this._http.post( API_URL + `computadoras/v2`, component )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'saveComputer' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
	
	getComputers(){
		this._helpersService.setTrue( 'getComputers' );
		return this._http.get( API_URL + 'computadoras' )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getComputers' ) ),
				map( ( data : any ) => {
					console.log(data);
					return ( data || [] ).map( ( pc: IBackendComputer ) => new Computer().parse( pc ) );
				} )
			);
	}
	
	deleteComputer( componentId: number ){
		this._helpersService.setTrue( 'deleteComputer' );
		return this._http.delete( API_URL + `computadoras/${ componentId }` )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'deleteComputer' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}
	
}
