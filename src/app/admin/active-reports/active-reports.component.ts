import { Component, OnInit } from '@angular/core';
import { ActiveReport, IActiveReport } from 'src/app/core/models/reports/active-report.model';
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

	rowTemplate = [ '_id', 'categoria', 'fechaDeActualizacion', 'estado', 'edit' ];

	activeReports : ActiveReport[] = [];

	loaderObject : Loader =  new Loader();

	constructor(
		private _helpersService : HelpersService,
		private _activeReportService : ActiveReportsService,
		private _snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
		console.log( this.activeReports );
		this.getReports();
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
				// console.log( data );
			},
			error => {
				this._snackbarService.showSnackbar( 'SAVE_REPORT', 'error' );
			}
		);
	}

	getReports( ){
		this._activeReportService.getReports().subscribe(
			data => {
				data = data.filter( ( report : ActiveReport ) => report.estado !== 'Nuevo' );
				this.activeReports = data;
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_REPORTS', 'error' );
			}
		);
	}

}
