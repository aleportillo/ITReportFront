import { Component, Input, OnInit } from '@angular/core';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';

@Component( {
	selector    : 'app-header',
	templateUrl : './header.component.html',
	styleUrls   : ['./header.component.css']
} )
export class HeaderComponent implements OnInit {

	@Input() currentSection = 'Dashboard';
	screenSize : ScreenSize = new ScreenSize();

	constructor(
		private _helpersService : HelpersService
	) { }

	sections = [
		{ text: 'Dashboard', 		img: 'dashboard' },
		{ text: 'Reportes nuevos', 	img: 'new_reports' },
		{ text: 'Reportes activos', img: 'active_reports' },
		{ text: 'Inventario',       img: 'warehouse' },
		{ text: 'Perfil', 			img: 'user' }
	];

	ngOnInit(): void {
		this.screenService();
	}

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
		} );
	}

	changeSection( section: {text:string; img:string} ){
		this.currentSection = section.text;
	}

}