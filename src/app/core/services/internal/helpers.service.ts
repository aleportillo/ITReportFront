import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IScreenSize, ScreenSize } from '../../models/tools/screen-size.model';

@Injectable( {
	providedIn : 'root'
} )
export class HelpersService {

	screenSize$ = new BehaviorSubject<IScreenSize>( new ScreenSize() );

	constructor() { }


}
