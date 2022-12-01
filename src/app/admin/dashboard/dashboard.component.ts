import { Component, OnInit } from '@angular/core';
import { Dashboard, IDashboard } from 'src/app/core/models/dashboard.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { DashboardService } from 'src/app/core/services/api/dashboard.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';

@Component( {
	selector    : 'app-dashboard',
	templateUrl : './dashboard.component.html',
	styleUrls   : ['./dashboard.component.css']
} )
export class DashboardComponent implements OnInit {
	
	allCards !: IDashboard;
	keys = [
		{ label: 'Total de computadoras', backend: 'computadoras' },
		{ label: 'Total de salas', backend: 'salas' },
		{ label: 'Total de reportes', backend: 'reportes' },
		{ label: 'Reportes\r\natendiendose', backend: 'reportesAtendiendose' },
		{ label: 'Reportes\r\nfinalizados', backend: 'reportesFinalizados' },
		{ label: 'Reportes\r\ndetenidos', backend: 'reportesDetenidos' },
		{ label: 'Reportes\r\npendientes', backend: 'reportesPendientes' },
	];
	loaderObject : Loader =  new Loader();
	
	constructor(
		private _dashboardService: DashboardService,
		private _snackbarService: SnackbarService,
		private _helperService: HelpersService
	) { }

	ngOnInit(): void {
		this.loaderService();
		this.getDashboard();
	}
	
	getDashboard(){
		this._dashboardService.getDashboard().subscribe(
			data => {
				this.allCards = data;
			},
			err => {
				this._snackbarService.showSnackbar(
					'ERR_GET_DASHBOARD', 
					'error'
				);
				this.allCards = new Dashboard();
			}
		);
	}
	
	loaderService(){
		this._helperService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}

}
