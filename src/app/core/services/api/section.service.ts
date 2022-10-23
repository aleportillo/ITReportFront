import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';
import { IBackendViewReport, ViewReport } from '../../models/reports/view-report.model';
import { Report } from '../../models/reports/report.model';
import { Incident } from '../../models/incident.model';

const API_URL = environment.apiURL;

@Injectable( {
	providedIn : 'root'
} )
export class SectionService {

	constructor(
		private _http   : HttpClient,
		private _helpersService : HelpersService
	) { }

	saveReport( report : Report, type : string, idSection : string ) {

		const params : any = {
			categoriaId      	: report?.categoria,
			tipoDeIncidenteId	: report?.incidente,
			comentariosAdmin 	: '',
			comentarios 		    : report?.comentarios
		};

		if ( type === 'computadora' ) { params.computadoraId = idSection; }
		else { params.salaId = idSection; }

		this._helpersService.setTrue( 'createReport' );
		return this._http.post( API_URL + 'reportes', { ...params } )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'createReport' ) ),
				map( ( data: any ) => {
					return data;
				} ) 
			);
	}

	getReports( type: string, idElement: string ) {
		const params : any = {};
		params[ `${ type }Id` ] = idElement;

		this._helpersService.setTrue( 'getUserReports' );
		return this._http.post( API_URL + `reportes/filtrar`, params )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getUserReports' ) ),
				map( ( data: any ) => {
					return ( data || [] ).map( ( report: IBackendViewReport ) => new ViewReport().parse( report ) );
				} ) 
			);
	}

	getIncident(){
		return this._http.get( API_URL + `tipos/incidentes` )
			.pipe(
				map( ( data: any ) => {
					return ( data || [] ).map( ( element: Incident ) => new Incident().parse( element ) );
				} ) 
			);
	}

	getCategories(){
		return this._http.get( API_URL + `tipos/categorias` )
			.pipe(
				map( ( data: any ) => {
					return data ;
				} ) 
			);
	}

}
