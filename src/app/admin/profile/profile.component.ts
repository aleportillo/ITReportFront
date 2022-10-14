import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';
import inputs from './../../../assets/jsons/profile.json';

@Component( {
	selector    : 'app-profile',
	templateUrl : './profile.component.html',
	styleUrls   : ['./profile.component.css']
} )
export class ProfileComponent implements OnInit {

	profileInputs = inputs;
	form : FormGroup  = new FormGroup( {} );
	screenSize: ScreenSize = new ScreenSize();
	
	constructor(
		private _formService: FormService,
		private _helpersService: HelpersService,
		private _snackbarService: SnackbarService
	) { }

	ngOnInit(): void {
		this.form = this._formService.createForm( this.profileInputs );
		this.screenService();
	}

	saveData(){
		console.log(this.form.value);
		this._snackbarService.showSnackbar( 'Funciona el snackbar', 'error' );
	}

	// -------------------------------------------------- ANCHOR: SUBS

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
		} );
	}

}
