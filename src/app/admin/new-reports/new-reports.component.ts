import { Component, OnDestroy, OnInit } from '@angular/core';
import { INewReport } from 'src/app/core/models/reports/new-report.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { NewReportsService } from 'src/app/core/services/api/new-reports.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';

@Component( {
	selector    : 'app-new-reports',
	templateUrl : './new-reports.component.html',
	styleUrls   : ['./new-reports.component.css']
} )
export class NewReportsComponent implements OnInit, OnDestroy {

	loaderObject : Loader =  new Loader();
	
	rowTemplate = [ 'tipo', 'categoria', 'fechaDeReporte', 'buttons' ];

	newReports : INewReport [ ] = [ ];
	
	getNewReportInterval : any ;

	constructor(
		private _helpersService : HelpersService,
		private _newReportService : NewReportsService,
		private _snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
		this.loadService();  
		this.getReports();
		const MILISECONDS = 60000;
		this.getNewReportInterval = setInterval( () => {this.getReports();}, MILISECONDS );
	}
	
	ngOnDestroy(): void {
		clearInterval( this.getNewReportInterval );
	}


	// -------------------------------------------------- ANCHOR: SUBS

	loadService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}

	// -------------------------------------------------- ANCHOR: API
	
	actionReport( type: string, report: INewReport ){
		if ( type === 'acceptReport' ){
			this.updateReport( report );
		} else {
			this.deleteReport( report );
		}
	}
	
	deleteReport( report : INewReport ){
		this._newReportService.deleteReport( report.id ).subscribe(
			data => {
				this.newReports = this.newReports.filter( card => card.id !== report.id );
				this._snackbarService.showSnackbar(
					'DELETE_REPORT', 
					'success'
				);
			},
			err => {
				this._snackbarService.showSnackbar(
					'ERR_DELETE_REPORT', 
					'error'
				);
			}
		);
	}

	updateReport( report : INewReport ) {
		this._newReportService.updateReport( report.id ).subscribe(
			data => {
				this.newReports = this.newReports.filter( ( newReport : INewReport ) => newReport.id !== report.id );
				this._snackbarService.showSnackbar( 'REPORT_ACCEPT', 'success' );
			},
			error => {
				this._snackbarService.showSnackbar( 'REPORT_ACCEPT', 'error' );
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
