import { Component, OnInit } from '@angular/core';
import { INewReport } from 'src/app/core/models/reports/new-report.modal';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { NewReportsService } from 'src/app/core/services/api/new-reports.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';

@Component( {
	selector    : 'app-new-reports',
	templateUrl : './new-reports.component.html',
	styleUrls   : ['./new-reports.component.css']
} )
export class NewReportsComponent implements OnInit {

	loaderObject : Loader =  new Loader();
	
	rowTemplate = [ 'tipo', 'categoria', 'fechaDeReporte', 'buttons' ];

	newReport1 : INewReport = {
		_id                : 124,
		tipo               : 'Sala',
		idTipo             : 173,
		categoria          : 'Solicitud',
		incidente          : 'Instalar',
		fechaDeReporte     : new Date( '03/10/2022' ),
		comentariosReporte	: 'qweeqweqweqweqweqwe'
	};

	newReport2 : INewReport = {
		_id                : 184,
		tipo               : 'PC',
		idTipo             : 173,
		categoria          : 'Solicitud',
		incidente          : 'Instalar',
		fechaDeReporte     : new Date( '03/10/2022' ),
		comentariosReporte	: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	};

	newReports = [ this.newReport1, this.newReport2 ];

	constructor(
		private _helpersService : HelpersService,
		private _newReportService : NewReportsService,
		private _snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
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
		this._newReportService.updateReport( event ).subscribe(
			data => {
				
			},
			error => {
				this._snackbarService.showSnackbar( 'SAVE_REPORT', 'error' );
			}
		);
	}

	getReports( ){
		this._newReportService.getReports().subscribe(
			data => {
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_REPORTS', 'error' );
			}
		);
	}
	

}
