import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/core/models/tools/form-input.modal';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';

@Component( {
	selector    : 'app-search',
	templateUrl : './search.component.html',
	styleUrls   : ['./search.component.css']
} )
export class SearchComponent implements OnInit {

	screenSize: ScreenSize = new ScreenSize();

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
			placeholder : 'ej. JUE221'
		}
	];

	form : FormGroup  = new FormGroup( {} );

	constructor(
		private _helpersService : HelpersService,
		private _formService : FormService,
		private _router: Router	
	) { }

	ngOnInit(): void {
		this.screenService();
		this.form = this._formService.createForm( this.inputs );	
		this.form = this._formService.initForm( this.form, { type: 'computadora' } );
		// console.log( this.form );
		
	}

	// -------------------------------------------------- ANCHOR: API

	search(){
		// console.log( this.form.value );
		this._router.navigate( [`/${ this.form.value.type }/${ this.form.value.textSearch }`] );
		
	}
	

	// -------------------------------------------------- ANCHOR: SUBS

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
		} );
	}
	

}
