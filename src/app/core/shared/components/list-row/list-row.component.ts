import { Component, Input, OnInit } from '@angular/core';
import { IActiveReport } from 'src/app/core/models/tools/reports/active-report.modal';

@Component( {
	selector    : 'app-list-row',
	templateUrl : './list-row.component.html',
	styleUrls   : ['./list-row.component.css']
} )
export class ListRowComponent implements OnInit {

	@Input() report : IActiveReport | any;
	@Input() rowTemplate : any;
	@Input() section = '';

	constructor() { }

	ngOnInit(): void {
	}

}
