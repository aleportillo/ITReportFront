import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { ProfileService } from 'src/app/core/services/api/profile.service';
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
	loaderObject : Loader =  new Loader();
	
	constructor(
		private _formService: FormService,
		private _helpersService: HelpersService,
		private _snackbarService: SnackbarService,
		private _profileService : ProfileService
	) { }

	ngOnInit(): void {
		this.form = this._formService.createForm( this.profileInputs );
		this.screenService();
		this.loaderService();
	}

	saveData(){
		console.log( this.form.value );
		this.updateDate();
	}

	// -------------------------------------------------- ANCHOR: SUBS

	screenService(){
		this._helpersService.screenSize$.subscribe( ( response ) => {
			this.screenSize = response;
		} );
	}


	// -------------------------------------------------- ANCHOR: API

	updateDate(){
		this._profileService.updateData().subscribe(
			data => {
			},
			error => {
				this._snackbarService.showSnackbar( 'UPDATE_PROFILE', 'error' );
			}
		);
	}

	loaderService(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}


	// -------------------------------------------------- ANCHOR: API
	
	getDate(){
		this._profileService.getData().subscribe(
			data => {
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_PROFILE', 'error' );
			}
		);
	}

}
