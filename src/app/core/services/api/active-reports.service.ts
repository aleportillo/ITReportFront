import { Injectable } from '@angular/core';
import { HelpersService } from '../internal/helpers.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';
import { ActiveReport, IActiveReport, IBackendActiveReport } from '../../models/reports/active-report.model';

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
		return this._http.post( API_URL + `reportes/filtrar`, { ignorarEstadoId: 0 } )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'getActiveReports' ) ),
				map( ( data: any ) => {
					return ( data || [] ).map( ( report: IBackendActiveReport ) => new ActiveReport().parse( report ) );
				} ) 
			);
	}


	updateReport( reportId: number, reportData: IActiveReport ) {

		const saveReport : any = {
			categoriaId       : reportData.categoriaId,
			tipoDeIncidenteId : reportData.tipoDeIncidenteId,
			comentarios       : reportData.comentariosReporte,
			comentariosAdmin  : reportData.comentariosAdmin,
			estadoId          : reportData.estadoId
		};
		
		if ( reportData.tipo === 'sala' ){
			saveReport.salaId = reportData.idTipoBackend;
		} else {
			saveReport.computadoraId = reportData.idTipoBackend;
		}
		console.log( saveReport );
		
		this._helpersService.setTrue( 'createReport' );
		return this._http.put( API_URL + `reportes/${ reportId }`, saveReport )
			.pipe(
				finalize( () => this._helpersService.setFalse( 'createReport' ) ),
				map( ( data: any ) => {
					console.log( data );
					console.log( 'SAVEEE' );
					return data;
				} ) 
			);
	}
}
