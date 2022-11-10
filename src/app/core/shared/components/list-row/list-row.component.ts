import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActiveReport } from 'src/app/core/models/reports/active-report.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';

@Component( {
	selector    : 'app-list-row',
	templateUrl : './list-row.component.html',
	styleUrls   : ['./list-row.component.css']
} )
export class ListRowComponent implements OnInit {

	@Input() report : IActiveReport | any;
	@Input() rowTemplate : any;
	@Input() section = '';
	@Output() clickButtonEmitter = new EventEmitter<string>();

	loaderObject : Loader =  new Loader();
	isItemEmiting = false;

	constructor(
		private _helpersService : HelpersService
	) { }

	ngOnInit(): void {
		console.log( this.report );
		
		this.loadService();
	}

	loadService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}

	clickButton( event : any ){
		this.isItemEmiting = true;
		this.clickButtonEmitter.emit( event );
	}
}
