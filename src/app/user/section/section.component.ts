import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IModalData, TYPE_SECTION } from 'src/app/core/models/tools/modal-data';
import { IViewReport, ViewReport } from 'src/app/core/models/reports/view-report.model';
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
import { ViewInventory } from 'src/app/core/models/inventory/view-inventory.model';
import { Subscription } from 'rxjs';

const SECTION_POSITION = 1;
const ID_SECTION = 2;
const FIRST_ELEMENT = 0;
const DEFAULT_VALUE = 0;
const ZERO_VALUES = 0;
@Component( {
	selector    : 'app-section',
	templateUrl : './section.component.html',
	styleUrls   : ['./section.component.css']
} )
export class SectionComponent implements OnInit, OnDestroy {

	@ViewChild ( 'firstColumn'  ) firstColumn  : ElementRef | undefined;
	@ViewChild ( 'secondColumn' ) secondColumn : ElementRef | undefined;

	type = 'room';
	idSection = '478ASD';
	sectionResume : any = {};
	backendId = DEFAULT_VALUE;
	subSectionActive = 'computadoras';

	// SUBS
	screenSize: ScreenSize = new ScreenSize();
	loaderObject : Loader =  new Loader();

	// COLUMNS
	firstColumnReports : ViewReport[] = [];
	secondColumnReports : ViewReport[] = [];
	allCards!: ViewReport[];
	allCardsInventory: ViewInventory[] = [];

	// RESUME
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

	// BUTTONS
	buttonsRoom = [
		{ label: 'Computadoras', key: 'computadoras' },
		{ label: 'Reportes', key: 'reportes' }
	];
	buttonsPC = [
		{ label: 'Componentes', key: 'componentes' },
		{ label: 'Reportes', key: 'reportes' }
	];
	
	// SUBS
	private _allSubs   : Subscription[] = [];


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

	ngOnInit() {
		this.screenService();
		this.loadOptions();
		this.modalService();
		this.loadService();
		this.currentElementService();
		
		
		// INIT VARS
		this.type = this._router.url.split( '/' )[SECTION_POSITION];
		this.idSection = this._router.url.split( '/' )[ID_SECTION];
		this.subSectionActive = ( this.type === 'sala' ) ? 
			this.buttonsRoom[FIRST_ELEMENT].key : 
			this.buttonsPC[FIRST_ELEMENT].key ;
		

		if ( this.type === 'sala' ){
			sessionStorage.setItem( 'IT_REPORT', `/` );
		}

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
		if ( !this.sectionResume || 
			this.sectionResume.computadoras === ZERO_VALUES 
			|| this.sectionResume.software === ZERO_VALUES 
		){ 
			this.search( true );
		} else {
			this.loadSubsectionItems( this.subSectionActive );
		}
		
	}
	
	ngOnDestroy(){
		this._allSubs.forEach( ( sub: Subscription ) => {
			sub.unsubscribe();
		} );
		this._allSubs = [];
	}


	// -------------------------------------------------- ANCHOR: HELPERS
	
	loadSubsectionItems( subSection: string ){
		switch ( subSection ){
			case 'computadoras':
				this.allCardsInventory = [];
				this.loaderObject.getInventoryItems = true;
				this.getInventoryItems( this.type, this.backendId.toString() );
				break;
			case 'componentes':
				this.allCardsInventory = [];
				this.loaderObject.getInventoryItems = true;
				this.getInventoryItems( this.type, this.backendId.toString() );
				break;
			case 'reportes':
				this.allCards = [];
				this.loaderObject.getUserReports = true;
				this.getReports( this.type, this.backendId.toString() );
				break;
		}
	}
	
	goBack(){
		this._router.navigate( [sessionStorage.getItem( 'IT_REPORT' ) ?? '/'] );
	}

	changeSubSection( button: {label: string; key: string} ){
		this.subSectionActive = button.key;
		this.loadSubsectionItems( button.key );
	}

	loadOptions(){
		const INDEX_INPUT_INCIDENT = 1;
		const INDEX_INPUT_CATEGORY = 0;
		const CLEAN = 0;

		if ( report[INDEX_INPUT_CATEGORY].options?.length === CLEAN 
			|| report[INDEX_INPUT_INCIDENT].allOptions?.reporte.length === CLEAN 
		){
			this.getCategories();
			this.getIncident();
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
		this._allSubs[this._allSubs.length] = this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
			this.fillColumns();
		} );
	}

	modalService(){
		this._allSubs[this._allSubs.length] = this._formService.formData$.subscribe( ( response ) => {
			if ( response.newData === null ) { return; }
			this.saveReport( response );
		} );
	}

	loadService(){
		this._allSubs[this._allSubs.length] = this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}

	currentElementService(){
		this._allSubs[this._allSubs.length] = this._helpersService.currentElementResume$.subscribe( ( response ) => {
			if ( response ){
				this.backendId = response[FIRST_ELEMENT]?.id;
				this.sectionResume = response[FIRST_ELEMENT];
			}
		} );
	}


	// -------------------------------------------------- ANCHOR: API

	saveReport( formData :  {newData : any; editData : any } ){
		
		this._sectionService.saveReport( formData.newData, this.type, this.backendId.toString() ).subscribe(
			data => {
				this._dialog.closeAll();
				this._formService.formData$.next( { newData: null, editData: null } );
				this._snackbarService.showSnackbar( 'SAVE_REPORT_USER' , 'success' );
			},
			error => {
				this._snackbarService.showSnackbar( 'SAVE_REPORT', 'error' );
			}
		);
	}

	search( fromInit?: boolean ){
		this._searchService.search( { type: this.type, textSearch: this.idSection } ).subscribe(
			data => {
				this._helpersService.currentElementResume$.next( data );
				if ( fromInit ){
					this.loadSubsectionItems( this.subSectionActive );
				}
			},
			error => {
				this._snackbarService.showSnackbar( error , 'error' );
			}
		);
	}

	getReports( type: string, idElement: string ){
		this._sectionService.getReports( type, idElement ).subscribe(
			data => {
				data = data.filter( ( activeReport : IViewReport ) => activeReport.estado !== 'Nuevo' && activeReport.estado !== 'Resuelto' );
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
	
	getInventoryItems( type: string, idElement: string ){
		this._sectionService.getInventoryItems( type, idElement ).subscribe(
			data => {
				this.allCardsInventory = data;
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_INVENTORY_ITEMS', 'error' );
			}
		);
	}

	getIncident( ){
		this._sectionService.getIncident( ).subscribe(
			data => {
				const INDEX_INPUT_INCIDENT = 1;
				const REPORT_ID = 1;
				const reportes : any = [];
				const solicitudes : any = [];
				data.forEach( ( element : any ) => {
					const parseElement = { text: element.nombre, value: element.id };
					if ( element.categoriaReporteId === REPORT_ID ){
						reportes.push( { ...parseElement } );
					} else {
						solicitudes.push( { ...parseElement } );
					}

					if ( report[INDEX_INPUT_INCIDENT].allOptions?.reporte ){
						report[INDEX_INPUT_INCIDENT].allOptions!.reporte = reportes ;
						report[INDEX_INPUT_INCIDENT].allOptions!.solicitud = solicitudes ;
					}
				} );
			}
		);
	}

	getCategories( ){
		this._sectionService.getCategories( ).subscribe(
			data => {
				const options : any = [];
				data.forEach( ( element : any ) => {
					options.push( { text: element.nombre, value: element.id } );
				} );
				const INDEX_INPUT_CATEGORY = 0;
				report[INDEX_INPUT_CATEGORY].options = options;
			}
		);
	}
	

	// -------------------------------------------------- ANCHOR: MODAL

	openDialog() {

		const modalData : IModalData = {
			title       : `${ this.type === 'sala' ? 'Sala' : 'PC' } ${ this.idSection }`,
			form        : report,
			typeSection : this.type as TYPE_SECTION,
			typeModal   : 'form',
			labelButton : 'Reportar'
		}; 

		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.panelClass = 'form';
		dialogConfig.data = modalData;

		const INDEX_INPUT_INCIDENT = 1;
		const INDEX_INPUT_CATEGORY = 0;
		const CLEAN = 0;

		if ( report[INDEX_INPUT_CATEGORY].options?.length !== CLEAN || report[INDEX_INPUT_INCIDENT].allOptions?.reporte.length !== CLEAN ){
			this._dialog.open( ModalComponent , dialogConfig );
		} else {
			this._snackbarService.showSnackbar( 'LOAD_FORM', 'error' );
		}
	}
	

}
