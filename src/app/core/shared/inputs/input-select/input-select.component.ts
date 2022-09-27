import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormInput, FormInput } from 'src/app/core/models/tools/form-input.modal';

@Component( {
	selector    : 'app-input-select',
	templateUrl : './input-select.component.html',
	styleUrls   : ['./input-select.component.css']
} )
export class InputSelectComponent implements OnInit {

	@Input() formInput : IFormInput = new FormInput();
	@Input() form : FormGroup = new FormGroup( {} );

	constructor() { }

	ngOnInit(): void {
		console.log(this.formInput);
		console.log(this.form.value);
		
		
	}

}
