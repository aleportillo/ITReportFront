import { Component, HostListener, OnInit } from '@angular/core';
import { ScreenSize } from './core/models/tools/screen-size.model';
import { HelpersService } from './core/services/internal/helpers.service';

const SMALL_LIMIT = 640;
const MEDIUM_LIMIT = 1024;

@Component( {
	selector  : 'app-root',
	template  : '<router-outlet></router-outlet>',
	styleUrls : []
} )

export class AppComponent implements OnInit  {

	title = 'Sistema de reportes de computadoras ITCJ';

	screenSize : ScreenSize = new ScreenSize();

	constructor(
		private _helpersService: HelpersService
	){}

	ngOnInit(){
		this.checkScreen();
	}

	@HostListener( 'window:resize', ['$event'] )
	onResize() {
		this.checkScreen();
	}

	checkScreen() {
		this.screenSize.size   = window.innerWidth;
		this.screenSize.small  = window.innerWidth < SMALL_LIMIT;
		this.screenSize.medium = window.innerWidth >= SMALL_LIMIT;
		this.screenSize.large  = window.innerWidth >= MEDIUM_LIMIT;
		console.log(this.screenSize);
		
		this._helpersService.screenSize$.next( this.screenSize );
	}
}
