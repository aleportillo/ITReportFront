import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActiveReport, IActiveReport } from 'src/app/core/models/reports/active-report.model';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { IModalData, TYPE_SECTION } from 'src/app/core/models/tools/modal-data';
import { ActiveReportsService } from 'src/app/core/services/api/active-reports.service';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import report from 'src/assets/jsons/update-report.json';

@Component( {
	selector    : 'app-active-reports',
	templateUrl : './active-reports.component.html',
	styleUrls   : ['./active-reports.component.css']
} )
export class ActiveReportsComponent implements OnInit {

	rowTemplate = [ '_id', 'categoria', 'fechaDeActualizacion', 'estado', 'edit' ];

	activeReports : IActiveReport[] = [];

	loaderObject : Loader =  new Loader();
	
	currentReport !: IActiveReport;

	constructor(
		private _helpersService : HelpersService,
		private _activeReportService : ActiveReportsService,
		private _snackbarService: SnackbarService,
		private _dialog: MatDialog,
		private _formService: FormService
	) { }

	ngOnInit(): void {
		this.getReports();
		this.loadService(); 
		this.modalService();
	}

	// -------------------------------------------------- ANCHOR: SUBS

	loadService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}
	
	modalService(){
		this._formService.formData$.subscribe( ( response ) => {
			if ( response.newData === null ) { return; }
			if ( response.editData === null ) { return; }
			this.saveReport( this.currentReport, response.newData );
		} );
	}


	// -------------------------------------------------- ANCHOR: API

	
	saveReport( actualData: IActiveReport, newData: any ){

		actualData.estadoId = newData.estadoId;
		actualData.comentariosAdmin = newData.comentariosAdmin;
		
		this._activeReportService.updateReport( actualData.id, { ...actualData } ).subscribe(
			data => {
				
				actualData.fechaActualizacion = new Date( data.fechaActualizacion );
				
				if ( actualData.estadoId === 1 ) { actualData.estado = 'Pendiente'; }
				if ( actualData.estadoId === 5 ) { actualData.estado = 'Atendiendo'; }
				if ( actualData.estadoId === 2 ) { actualData.estado = 'Detenido'; }
				if ( actualData.estadoId === 3 ) { actualData.estado = 'Resuelto'; }
				
				const actualDataIndex = this.activeReports.findIndex( activeReport => activeReport.id === actualData.id );
				this.activeReports[actualDataIndex] = actualData;
				// this.activeReports = this.activeReports;
				this._dialog.closeAll();
				this._formService.formData$.next( { newData: null, editData: null } );
				this.currentReport = new ActiveReport ();
				this._snackbarService.showSnackbar(
					'SAVE_REPORT', 
					'success'
				);
				
			},
			err => {
				this._snackbarService.showSnackbar(
					'SAVE_REPORT', 
					'error'
				);
			}
		);
	
	}

	getReports( ){
		this._activeReportService.getReports().subscribe(
			data => {
				data = data.filter( ( activeReport : ActiveReport ) => activeReport.estado !== 'Nuevo' );
				// this.activeReports = data.sort((a: any, b: any )=> b.fechaDeReporte- a.fechaDeReporte);
				this.activeReports = data;
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_REPORTS', 'error' );
			}
		);
	}
	
		// -------------------------------------------------- ANCHOR: MODAL

	openDialog( reportEdit : IActiveReport ) {

		const formReport = JSON.parse( JSON.stringify( report ) );
		formReport.forEach( ( input : IFormInput ) => {

			if ( input.name === 'tipoDeIncidenteId' ) {
				input.options?.push( { value: reportEdit.tipoDeIncidenteId, text: reportEdit.incidente } );
			}
			if ( input.name === 'categoriaId' ) {
				input.options?.push( { value: reportEdit.categoriaId, text: reportEdit.categoria } );
			}
			if ( input.name === 'comentariosReporte' ){
				const date = ` (
					${ reportEdit.fechaDeReporte?.getDate() }/
					${ ( reportEdit.fechaDeReporte?.getMonth() ?? 0 ) + 1 }/
					${ reportEdit.fechaDeReporte?.getFullYear() }
				)`;
				input.label += date;
			}
			if ( input.name === 'comentariosAdmin' && reportEdit?.fechaActualizacion ){
				const date = ` (
					${ reportEdit.fechaActualizacion?.getDate() }/
					${ ( reportEdit.fechaActualizacion?.getMonth() ?? 0 ) + 1 }/
					${ reportEdit.fechaActualizacion?.getFullYear() }
				)`;
				input.label += date;
			}
		} );
		// console.log(new Date(reportEdit.fechaDeReporte));
		const typeTitle = ( reportEdit.tipo === 'sala' ) ? reportEdit.tipo.charAt( 0 ).toUpperCase() + reportEdit.tipo.slice( 1 ) : 'PC';
		const typeSection = ( reportEdit.tipo === 'sala' ) ? 'room' : 'pc';
		const modalData : IModalData = {
			title       : `#${ reportEdit.id }: ${ typeTitle  } ${ reportEdit.idTipo }`,
			form        : formReport,
			typeSection : typeSection as TYPE_SECTION,
			typeModal   : 'form',
			labelButton : 'Actualizar'
		}; 
	
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.panelClass = 'form';
		dialogConfig.data = modalData;
	
		this._dialog.open( ModalComponent , dialogConfig );
		this._formService.formData$.next( { newData: null, editData: reportEdit } );
		this.currentReport = reportEdit;
	}

}
