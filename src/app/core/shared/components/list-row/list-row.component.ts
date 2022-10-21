import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IActiveReport } from 'src/app/core/models/reports/active-report.modal';
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

	constructor(
		private _helpersService : HelpersService
	) { }

	ngOnInit(): void {
		this.loadService();
	}

	loadService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}

	clickButton( event : any ){
		this.clickButtonEmitter.emit( event );
	}
}
