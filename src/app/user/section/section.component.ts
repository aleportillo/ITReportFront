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
	
	screenSize: ScreenSize = new ScreenSize();

	constructor(
		private _helpersService : HelpersService
	) { }

	ngOnInit(): void {
		this.screenService();
	}

	// -------------------------------------------------- ANCHOR: SUBS

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
		} );
	}

}
