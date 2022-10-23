import { Component, OnInit } from '@angular/core';
import { INewReport, NewReport } from 'src/app/core/models/reports/new-report.model';
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


	newReports : INewReport [ ] = [ ];

	constructor(
		private _helpersService : HelpersService,
		private _newReportService : NewReportsService,
		private _snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
		this.loadService();  
		this.getReports();
	}


	// -------------------------------------------------- ANCHOR: SUBS

	loadService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}

	// -------------------------------------------------- ANCHOR: API

	updateReport( event: any, report : INewReport ) {
		this._newReportService.updateReport( event, report.id ).subscribe(
			data => {
				this.newReports = this.newReports.filter( ( newReport : INewReport ) => newReport.id !== report.id );
				this._snackbarService.showSnackbar( 'El reporte ha sido aceptado correctamente', 'success' );
			},
			error => {
				this._snackbarService.showSnackbar( 'SAVE_REPORT', 'error' );
			}
		);
	}

	getReports( ){
		this._newReportService.getReports().subscribe(
			data => {
				this.newReports = data;
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_REPORTS', 'error' );
			}
		);
	}
	

}
