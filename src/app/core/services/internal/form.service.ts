import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IFormInput } from '../../models/tools/form-input.model';
import { Report } from '../../models/reports/report.model';
import { IRoom } from '../../models/inventory/room.model';
import { IComputer } from '../../models/inventory/computer.model';
import { IComponentItem } from '../../models/inventory/component.model';
import { IActiveReport } from '../../models/reports/active-report.model';

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
		newData : Report | IRoom | IComputer | IComponentItem | IActiveReport |null;
		editData: Report | IRoom | IComputer | IComponentItem | IActiveReport |null;
	}>( { newData: null, editData: null } );

	constructor() { }

	createForm( inputs: IFormInput[] ) : FormGroup {
		const form = new FormGroup( {} );
		inputs.forEach( input => {
			const validations = [];
			if ( !input.optional ) { validations.push( Validators.required ); }
			if ( input.minLength ) { validations.push ( Validators.minLength( input.minLength ) ); }
			form.addControl( input.name, new FormControl( '', validations ) );
		} );

		return form;
	}

	initForm( form: FormGroup, values: any ) : FormGroup {
		Object.keys( values ).forEach( ( keyValue : any ) => {
			if ( keyValue === 'password' ) { return; }
			if ( keyValue === 'componentesSoftware' ){
				const softwareValues : any = [];
				values[keyValue].forEach( ( item : any ) => softwareValues.push( item.value ) );
				form.controls[keyValue]?.setValue( softwareValues );
				return;
			}
			if ( keyValue === 'componentsHardware' ){
				const hardwareValues : any = [];
				values[keyValue].forEach( ( item : any ) => hardwareValues.push( item.value ) );
				form.controls[keyValue]?.setValue( hardwareValues );
				return;
			}
			form.controls[keyValue]?.setValue( values[keyValue] );
		} );
		return form;
		
	}
}
