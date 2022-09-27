import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormInput } from '../../models/tools/form-input.modal';

@Injectable( {
	providedIn : 'root'
} )
export class FormService {

	constructor() { }

	createForm( inputs: IFormInput[] ) : FormGroup {
		const form = new FormGroup( {} );
		inputs.forEach( input => {
			const validations = [];
			if ( !input.optional ) { validations.push( Validators.required ); }
			form.addControl( input.name, new FormControl( '', validations ) );
		} );

		return form;
	}

	initForm( form: FormGroup, values: any ) : FormGroup {
		Object.keys( values ).forEach( ( keyValue : any ) => {
			form.controls[keyValue]?.setValue( values[keyValue] );
		} );
		return form;
		
	}
}
