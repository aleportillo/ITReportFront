import { Component, OnInit } from '@angular/core';
import { IDashboard } from 'src/app/core/models/dashboard.model';
import { DashboardService } from 'src/app/core/services/api/dashboard.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';

@Component( {
	selector    : 'app-dashboard',
	templateUrl : './dashboard.component.html',
	styleUrls   : ['./dashboard.component.css']
} )
export class DashboardComponent implements OnInit {
	
	allCards !: IDashboard;
	keys = [
		{ label: 'Computadoras', backend: 'computadoras' },
		{ label: 'Salas', backend: 'salas' },
		{ label: 'Total de reportes', backend: 'reportes' },
		{ label: 'Reportes\r\natendiendose', backend: 'reportesAtendiendose' },
		{ label: 'Reportes\r\nfinalizados', backend: 'reportesFinalizados' },
		{ label: 'Reportes\r\ndetenidos', backend: 'reportesDetenidos' },
		{ label: 'Reportes\r\npendientes', backend: 'reportesPendientes' },
	];
	
	constructor(
		private _dashboardService: DashboardService,
		private _snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
		this.getDashboard();
	}
	
	getDashboard(){
		this._dashboardService.getDashboard().subscribe(
			data => {
				this.allCards = data;
				console.log( this.allCards );
			},
			err => {
				this._snackbarService.showSnackbar(
					'ERR_GET_ROOMS', 
					'error'
				);
			}
		);
	}

}
