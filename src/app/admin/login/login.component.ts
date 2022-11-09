import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { ScreenSize } from 'src/app/core/models/tools/screen-size.model';
import { ProfileService } from 'src/app/core/services/api/profile.service';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';


@Component( {
	selector    : 'app-login',
	templateUrl : './login.component.html',
	styleUrls   : ['./login.component.css']
} )
export class LoginComponent implements OnInit {

	screenSize: ScreenSize = new ScreenSize();
	loaderObject : Loader =  new Loader();

	inputs : IFormInput[] = [
		{
			label   : 'Usuario',
			name    : 'usuario',
			type    : 'text',
			subtype : 'login',
			image   : 'usuario'
		}, 
		{
			label   : 'Contraseña',
			name    : 'password',
			type    : 'password',
			subtype : 'login',
			image   : 'password'
		}
	];

	form : FormGroup  = new FormGroup( {} );
	
	constructor(
		private _helpersService : HelpersService,
		private _formService : FormService,
		private _router: Router,
		private _profileService : ProfileService,
		private _snackbarService : SnackbarService
	) { }

	ngOnInit(): void {
		this.screenService();
		this.loaderService();
		this.form = this._formService.createForm( this.inputs );	
	}

	// -------------------------------------------------- ANCHOR: API

	async search(){
		const { usuario, password } = this.form.value;
		this._profileService.login( usuario, password ).subscribe(
			async data => {
				this.getData();
			},
			error => {
				console.log( error );
				this._snackbarService.showSnackbar( error , 'error' );
			}
		);
	}
	
	getData(){
		this._profileService.getData().subscribe(
			data => {
				this._helpersService.user$.next( data );
				localStorage.setItem( 'IT_REPORT_NAME', data.nombre );
				this._router.navigate( [`/admin/home`] );
			},
			error => {
				this._snackbarService.showSnackbar( 'GET_PROFILE', 'error' );
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
