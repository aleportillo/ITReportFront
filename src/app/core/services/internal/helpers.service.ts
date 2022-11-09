import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Admin, IAdmin } from '../../models/admin.model';
import { ILoader, Loader } from '../../models/tools/loader.model';
import { IScreenSize, ScreenSize } from '../../models/tools/screen-size.model';

@Injectable( {
	providedIn : 'root'
} )
export class HelpersService {

	screenSize$           = new BehaviorSubject<IScreenSize>( new ScreenSize() );
	loader$ 	          = new BehaviorSubject<ILoader>( new Loader() );
	user$ 		          = new BehaviorSubject<IAdmin>( new Admin() );
	currentElementResume$ = new BehaviorSubject<any>( {} );
	noticeModal$ 		  = new BehaviorSubject<{delete: boolean}>( { delete: false } );
	loaderObject : Loader =  new Loader();

	constructor() {
		this.loader$.subscribe( response => {
			this.loaderObject = response;
		} );
	}

	// -------------------------------------------------- ANCHOR: LOADER
	
	setTrue( section: string ){
		this.loaderObject[section] = true;
		this.loader$.next( this.loaderObject );
	}

	setFalse( section: string ){
		this.loaderObject[section] = false;
		this.loader$.next( this.loaderObject );
	}
}
