import { Component, OnInit } from '@angular/core';
import { IActiveReport } from 'src/app/core/models/tools/reports/active-report.modal';

@Component( {
	selector    : 'app-active-reports',
	templateUrl : './active-reports.component.html',
	styleUrls   : ['./active-reports.component.css']
} )
export class ActiveReportsComponent implements OnInit {

	// activeReports = []
	rowTemplate = ['_id', 'categoria', 'fechaDeActualizacion', 'estado', 'edit'];

	activeReport1 : IActiveReport = {
		_id                 : 124,
		tipo                : 'Sala',
		idTipo              : 173,
		categoria           : 'Solicitud',
		incidente           : 'Instalar',
		fechaDeActualzacion : new Date( '03/10/2022' ),
		estado              : 'pendiente'
	};

	activeReport2 : IActiveReport = {
		_id                 : 184,
		tipo                : 'PC',
		idTipo              : 173,
		categoria           : 'Solicitud',
		incidente           : 'Instalar',
		fechaDeActualzacion : new Date( '03/10/2022' ),
		estado              : 'detenido'
	};

	activeReports = [this.activeReport1, this.activeReport2];

	constructor() { }

	ngOnInit(): void {
		console.log(this.activeReports);
		
	}

}
