import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { SearchService } from 'src/app/core/services/api/search.service';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';

@Component( {
	selector    : 'app-search',
	templateUrl : './search.component.html',
	styleUrls   : ['./search.component.css']
} )
export class SearchComponent implements OnInit {

	screenSize: ScreenSize = new ScreenSize();
	loaderObject : Loader =  new Loader();

	inputs : IFormInput[] = [
		{
			name    : 'type',
			type    : 'select',
			subtype : 'search',
			options : [
				{ text: 'Sala', value: 'sala' },
				{ text: 'Computadora', value: 'computadora' }
			]
		}, 
		{
			name        : 'textSearch',
			type        : 'text',
			subtype     : 'search',
			placeholder : 'Ej: 145ER'
		}
	];

	form : FormGroup  = new FormGroup( {} );

	constructor(
		private _helpersService : HelpersService,
		private _formService : FormService,
		private _router: Router,
		private _searchService : SearchService,
		private _snackbarService : SnackbarService
	) { }

	ngOnInit(): void {
		this.screenService();
		this.loaderService();
		this.form = this._formService.createForm( this.inputs );	
		this.form = this._formService.initForm( this.form, { type: 'computadora' } );
		// console.log( this.form );
		
	}

	// -------------------------------------------------- ANCHOR: API

	search(){
		this._searchService.search().subscribe(
			data => {
				sessionStorage.setItem( 'IT_REPORT', `/` );
				this._router.navigate( [`/${ this.form.value.type }/${ this.form.value.textSearch }`] );
			},
			error => {
				this._router.navigate( [`/${ this.form.value.type }/${ this.form.value.textSearch }`] );
				this._snackbarService.showSnackbar( 'SEARCH', 'error' );
			}
		);
	}
	

	// -------------------------------------------------- ANCHOR: SUBS

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
		} );
	}

	loaderService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}
	

}
