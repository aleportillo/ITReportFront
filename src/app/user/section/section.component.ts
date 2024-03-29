import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IModalData, TYPE_SECTION } from 'src/app/core/models/tools/modal-data';
import { ViewReport } from 'src/app/core/models/reports/view-report.model';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import report from './../../../assets/jsons/report.json';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/core/services/api/section.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { SearchService } from 'src/app/core/services/api/search.service';

const SECTION_POSITION = 1;
const ID_SECTION = 2;
const FIRST_ELEMENT = 0;
@Component( {
	selector    : 'app-section',
	templateUrl : './section.component.html',
	styleUrls   : ['./section.component.css']
} )
export class SectionComponent implements OnInit {

	@ViewChild ( 'firstColumn'  ) firstColumn  : ElementRef | undefined;
	@ViewChild ( 'secondColumn' ) secondColumn : ElementRef | undefined;

	type = 'room';
	idSection = '478ASD';
	sectionResume : any = {};

	salaResume = [
		{ label: 'Solicitudes de la sala', key: 'solicitudesSala' },
		{ label: 'Reportes de la sala', key: 'reportesSala' },
		{ label: 'Total de PCs', key: 'computadoras' },
		{ label: 'Reportes (PCs)', key: 'reportesPC' },
		{ label: 'Solicitudes (PCs)', key: 'solicitudesPC' }
	];

	pcResume = [
		{ label: 'Solicitudes', key: 'solicitudes' },
		{ label: 'Reportes', key: 'reportes' },
		{ label: 'Componentes', key: 'componentes' },
		{ label: 'Software', key: 'software' },
		{ label: 'Hardware', key: 'hardware' },
	];

	buttonsRoom = [
		{ label: 'Computadoras', key: 'computadoras' },
		{ label: 'Reportes', key: 'reportes' }
	];

	buttonsPC = [
		{ label: 'Componentes', key: 'componentes' },
		{ label: 'Reportes', key: 'reportes' }
	];

	subSectionActive = 'computadoras';
	
	screenSize: ScreenSize = new ScreenSize();
	loaderObject : Loader =  new Loader();

	firstColumnReports : ViewReport[] = [];
	secondColumnReports : ViewReport[] = [];

	constructor(
		private _helpersService : HelpersService,
		private _cdr: ChangeDetectorRef,
		private _dialog: MatDialog,
		private _formService : FormService,
		private _router: Router,
		private _sectionService : SectionService,
		private _snackbarService: SnackbarService,
		private _searchService : SearchService
	) { }

	xreportx = {
		_id                : 5,
		fechaDeReporte     : new Date( '2022-10-02T03:29:17.505Z' ),
		categoria          : 'Solicitud',
		incidente          : 'sin internet',
		estado             : 'pendiente',
		comentariosReporte : '',
		comentariosAdmin   : ''
	};

	reporteLargo = {
		_id                : 8,
		fechaDeReporte     : new Date( '2022-10-13T03:29:17.505Z' ),
		categoria          : 'Solicitud',
		incidente          : 'sin internet',
		estado             : 'pendiente',
		comentariosReporte : 'eqweqweqweqweqe',
		comentariosAdmin   : 'asdasdasdasda'
	};

	allCards!: ViewReport[];
	

	ngOnInit(): void {
		this.screenService();
		this.modalService();
		this.loadService();
		this.currentElementService();
		this.type = this._router.url.split( '/' )[SECTION_POSITION];
		this.idSection = this._router.url.split( '/' )[ID_SECTION];
		this.subSectionActive = ( this.type === 'sala' ) ? 
			this.buttonsRoom[FIRST_ELEMENT].key : 
			this.buttonsPC[FIRST_ELEMENT].key ;
		
		this.sectionResume = {
			solicitudesSala : 0,
			reportesSala    : 0,
			computadoras    : 0,
			reportesPC      : 0,
			solicitudesPC   : 0,
			componentes     : 0,
			hardware        : 0,
			reportes        : 0,
			solicitudes     : 0,
			software        : 0
		};
		const ZERO_VALUES = 0;
		if ( !this.sectionResume || this.sectionResume.computadoras === ZERO_VALUES || this.sectionResume.software === ZERO_VALUES ){ 
			this.search();
		}
	}


	// -------------------------------------------------- ANCHOR: HELPERS
	
	goBack(){
		this._router.navigate( [sessionStorage.getItem( 'IT_REPORT' ) ?? '/'] );
	}

	changeSubSection( button: {label: string; key: string} ){

		this.subSectionActive = button.key;

		if ( button.key === 'reportes' ){
			this.allCards = [];
			this.loaderObject.getUserReports = true;
			this.getReports( this.type, JSON.parse( sessionStorage.getItem( 'IT_ELEMENT' ) ?? '' ).id );
		}

	}

	fillColumns(){
		this.secondColumnReports = [];
		this.firstColumnReports = [];
		const MIN_REPORTS = 1;
		if ( !this.allCards || this.allCards?.length < MIN_REPORTS ){
			return;
		}

		if ( this.screenSize.small ){
			this.firstColumnReports = [...this.allCards];
			return;
		}

		const maxHeightDifference = 110;		
		const FIRST_COLUMN = 1;
		const SECOND_COLUMN = 0;
		const ZERO = 0; // For index 0 and positive numbers
		let lastColumn = FIRST_COLUMN;


		if ( !this.firstColumn || !this.secondColumn ) { return; }

		this.firstColumnReports.push( this.allCards[ZERO] );
		
		for ( let index = 1; index < this.allCards.length ; index++ ) {

			const firstColumnHeight  = this.firstColumn.nativeElement.clientHeight;
			this._cdr.detectChanges();
			const secondColumnHeight  = this.secondColumn.nativeElement.clientHeight;
			this._cdr.detectChanges();
			
			const heightDifference = firstColumnHeight - secondColumnHeight;
 
			if ( heightDifference > ZERO && heightDifference > maxHeightDifference ){
				this.secondColumnReports.push( this.allCards[index] );
				lastColumn = SECOND_COLUMN;
			} 
			else if ( heightDifference < ZERO && heightDifference < -maxHeightDifference ) {
				this.firstColumnReports.push( this.allCards[index] );
				lastColumn = FIRST_COLUMN;
			} 
			else if ( lastColumn === SECOND_COLUMN ){
				this.firstColumnReports.push( this.allCards[index] );
				lastColumn = FIRST_COLUMN;
			} 
			else {
				this.secondColumnReports.push( this.allCards[index] );
				lastColumn = SECOND_COLUMN;
			}
		}
	}

	createReport(){
		this.openDialog();
	}
	

	// -------------------------------------------------- ANCHOR: SUBS

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
			this.fillColumns();
		} );
	}

	modalService(){
		this._formService.formData$.subscribe( ( response ) => {
			if ( response.newData ){
				this.saveReport( response );
			}
		} );
	}

	loadService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}

	currentElementService(){
		// const FIRST_ELEMENT = 0;
		this._helpersService.currentElementResume$.subscribe( ( response ) => {
			if ( response ){
				this.sectionResume = response[FIRST_ELEMENT];
			}
			console.log( 'UPDATE', response[FIRST_ELEMENT] );
			console.log( this.sectionResume );
			
		} );
	}



	// -------------------------------------------------- ANCHOR: API

	saveReport( formData :  {newData : any; editData : any } ){
		this._sectionService.saveReport().subscribe(
			data => {
				this._dialog.closeAll();
				console.log( 'save' );
				formData.newData = null;
				this._formService.formData$.next( formData );
			},
			error => {
				this._dialog.closeAll();
				formData.newData = null;
				this._formService.formData$.next( formData );
				this._snackbarService.showSnackbar( 'SAVE_REPORT', 'error' );
			}
		);
	}

	search(){
		this._searchService.search( { type: this.type, textSearch: this.idSection } ).subscribe(
			data => {
				// console.log( this.sectionResume );
				this._helpersService.currentElementResume$.next( data );
			},
			error => {
				this._snackbarService.showSnackbar( error , 'error' );
			}
		);
	}

	getReports( type: string, idElement: string ){
		this._sectionService.getReports( type, idElement ).subscribe(
			data => {
				console.log( data ); 
				this.allCards = data;
				const MILLISECONDS_OF_WAITING = 20;
				setTimeout( () => {
					this.fillColumns(); 
				}, MILLISECONDS_OF_WAITING );
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_REPORTS', 'error' );
			}
		);
	}
	

	// -------------------------------------------------- ANCHOR: MODAL

	openDialog() {

		const modalData : IModalData = {
			title       : `${ this.type === 'room' ? 'Sala' : 'PC' } ${ this.idSection }`,
			form        : report,
			values      : [],
			typeSection : this.type as TYPE_SECTION,
			typeModal   : 'form',
			labelButton : 'Reportar'
		}; 

		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.panelClass = 'form';
		dialogConfig.data = modalData;

		this._dialog.open( ModalComponent , dialogConfig );
	}
	

}
