import { Component, OnInit } from '@angular/core';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';

@Component( {
	selector    : 'app-search',
	templateUrl : './search.component.html',
	styleUrls   : ['./search.component.css']
} )
export class SearchComponent implements OnInit {

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
