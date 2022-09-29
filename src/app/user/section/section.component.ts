import { Component, OnInit } from '@angular/core';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';

@Component( {
	selector    : 'app-section',
	templateUrl : './section.component.html',
	styleUrls   : ['./section.component.css']
} )
export class SectionComponent implements OnInit {

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

	constructor(
		private _helpersService : HelpersService
	) { }

	ngOnInit(): void {
		this.screenService();
	}

	changeSubSection( button: {label: string; key: string} ){
		this.subSectionActive = button.key;
	}

	// -------------------------------------------------- ANCHOR: SUBS

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
		} );
	}

}
