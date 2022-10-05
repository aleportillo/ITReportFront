import { Component, Input, OnInit } from '@angular/core';
import { ViewReport } from 'src/app/core/models/tools/reports/view-report.model';

@Component( {
	selector    : 'app-report-card',
	templateUrl : './report-card.component.html',
	styleUrls   : ['./report-card.component.css']
} )
export class ReportCardComponent implements OnInit {

	@Input() report: ViewReport = new ViewReport();

	constructor() { }

	ngOnInit(): void { }

}
