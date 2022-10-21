import { Component, OnInit } from '@angular/core';
import { IActiveReport } from 'src/app/core/models/reports/active-report.modal';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { ActiveReportsService } from 'src/app/core/services/api/active-reports.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';

@Component( {
	selector    : 'app-active-reports',
	templateUrl : './active-reports.component.html',
	styleUrls   : ['./active-reports.component.css']
} )
export class ActiveReportsComponent implements OnInit {

	// activeReports = []
	rowTemplate = [ '_id', 'categoria', 'fechaDeActualizacion', 'estado', 'edit' ];

	activeReport1 : IActiveReport = {
		_id                 : 124,
		tipo                : 'Sala',
		idTipo              : 173,
		categoria           : 'Solicitud',
		incidente           : 'Instalar',
		fechaDeActualzacion : new Date( '03/10/2022' ),
		estado              : 'pendiente'
	};

	activeReport2 : IActiveReport = {
		_id                 : 184,
		tipo                : 'PC',
		idTipo              : 173,
		categoria           : 'Solicitud',
		incidente           : 'Instalar',
		fechaDeActualzacion : new Date( '03/10/2022' ),
		estado              : 'detenido'
	};

	activeReports = [ this.activeReport1, this.activeReport2 ];

	loaderObject : Loader =  new Loader();

	constructor(
		private _helpersService : HelpersService,
		private _activeReportService : ActiveReportsService,
		private _snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
		console.log( this.activeReports );
		this.loadService(); 
	}

	// -------------------------------------------------- ANCHOR: SUBS

	loadService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}


	// -------------------------------------------------- ANCHOR: API

	updateReport( event: any ){
		this._activeReportService.updateReport( event ).subscribe(
			data => {
				
			},
			error => {
				this._snackbarService.showSnackbar( 'SAVE_REPORT', 'error' );
			}
		);
	}

	getReports( ){
		this._activeReportService.getReports().subscribe(
			data => {
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_REPORTS', 'error' );
			}
		);
	}

}
