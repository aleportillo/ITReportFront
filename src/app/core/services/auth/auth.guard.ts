import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from '../api/profile.service';

@Injectable( {
	providedIn : 'root'
} )
export class AuthGuard implements CanActivate {
	
	constructor(
		private _profileService: ProfileService,
		public router: Router
	){}
	
	canActivate(): boolean {
		const isUserLogged = this._profileService.isLogged();
						
		if ( !isUserLogged ) {
			this.router.navigate( ['/admin'] );
		}
		return isUserLogged;
	}
}
