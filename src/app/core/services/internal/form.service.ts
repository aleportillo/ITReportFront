import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IFormInput } from '../../models/tools/form-input.model';
import { Report } from '../../models/reports/report.model';
import { IRoom, Room } from '../../models/inventory/room.model';

@Injectable( {
	providedIn : 'root'
} )
export class FormService {
	// SUBSCRIPTIONS
	/**
	 * Loads the new information sent from the sidepanel 
	 * and the original information sent from the backend.
	 */
	 formData$ = new BehaviorSubject<{
		newData : Report | IRoom | null;
		editData: Report | IRoom | null;
	}>( { newData: null, editData: null } );

	constructor() { }

	createForm( inputs: IFormInput[] ) : FormGroup {
		const form = new FormGroup( {} );
		inputs.forEach( input => {
			const validations = [];
			if ( !input.optional ) { validations.push( Validators.required ); }
			if ( input.minLength ) { validations.push (Validators.minLength(input.minLength));}
			form.addControl( input.name, new FormControl( '', validations ) );
		} );

		return form;
	}

	initForm( form: FormGroup, values: any ) : FormGroup {
		Object.keys( values ).forEach( ( keyValue : any ) => {
			if ( keyValue === 'password' ) { return; }
			form.controls[keyValue]?.setValue( values[keyValue] );
		} );
		return form;
		
	}
}
