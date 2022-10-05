import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewReport } from 'src/app/core/models/tools/reports/view-report.model';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';

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
	sectionResume = [
		{ label: 'Solicitudes de la sala', key: '' },
		{ label: 'Reportes de la sala', key: '' },
		{ label: 'Total de PCs', key: '' },
		{ label: 'Reportes (PCs)', key: '' },
		{ label: 'Solicitudes de la sala', key: '' },
		{ label: 'Solicitudes (PCs)', key: '' }
	];

	buttons = [
		{ label: 'Computadoras', key: 'computadoras' },
		{ label: 'Reportes', key: 'reportes' }
	];

	subSectionActive = 'computadoras';
	
	screenSize: ScreenSize = new ScreenSize();

	firstColumnReports : ViewReport[] = [];
	secondColumnReports : ViewReport[] = [];

	constructor(
		private _helpersService : HelpersService,
		private _cdr: ChangeDetectorRef
	) { }

	report = {
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

	allCards = [
		this.reporteLargo, this.report, this.reporteLargo, this.report, this.reporteLargo, this.report, this.report, this.reporteLargo, this.report,  this.report, this.report, this.report 
	];
	

	ngOnInit(): void {
		this.screenService();
	}

	changeSubSection( button: {label: string; key: string} ){

		this.subSectionActive = button.key;
		const MILLISECONDS_OF_WAITING = 20;

		if ( button.key === 'reportes' ){
			setTimeout( () => {
				this.fillColumns(); 
			}, MILLISECONDS_OF_WAITING );
		}

	}

	fillColumns(){
		this.secondColumnReports = [];
		this.firstColumnReports = [];

		if ( this.screenSize.small ){
			this.firstColumnReports = [...this.allCards as ViewReport[]];
			return;
		}

		const maxHeightDifference = 110;		
		const FIRST_COLUMN = 1;
		const SECOND_COLUMN = 0;
		const ZERO = 0; // For index 0 and positive numbers
		let lastColumn = FIRST_COLUMN;


		if ( !this.firstColumn || !this.secondColumn ) { return; }

		this.firstColumnReports.push( new ViewReport().parse( this.allCards[ZERO] ) );
		
		for ( let index = 1; index < this.allCards.length ; index++ ) {

			this.allCards[index]._id = index;

			const firstColumnHeight  = this.firstColumn.nativeElement.clientHeight;
			this._cdr.detectChanges();
			const secondColumnHeight  = this.secondColumn.nativeElement.clientHeight;
			this._cdr.detectChanges();
			
			const heightDifference = firstColumnHeight - secondColumnHeight;
 
			if ( heightDifference > ZERO && heightDifference > maxHeightDifference ){
				this.secondColumnReports.push( new ViewReport().parse( this.allCards[index] ) );
				lastColumn = SECOND_COLUMN;
			} 
			else if ( heightDifference < ZERO && heightDifference < -maxHeightDifference ) {
				this.firstColumnReports.push( new ViewReport().parse( this.allCards[index] ) );
				lastColumn = FIRST_COLUMN;
			} 
			else if ( lastColumn === SECOND_COLUMN ){
				this.firstColumnReports.push( new ViewReport().parse( this.allCards[index] ) );
				lastColumn = FIRST_COLUMN;
			} 
			else {
				this.secondColumnReports.push( new ViewReport().parse( this.allCards[index] ) );
				lastColumn = SECOND_COLUMN;
			}
		}
	}

	// -------------------------------------------------- ANCHOR: SUBS

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
			this.fillColumns();
		} );
	}

}
