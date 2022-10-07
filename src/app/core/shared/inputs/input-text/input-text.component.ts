import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInput, IFormInput } from 'src/app/core/models/tools/form-input.model';

@Component( {
	selector    : 'app-input-text',
	templateUrl : './input-text.component.html',
	styleUrls   : ['./input-text.component.css']
} )
export class InputTextComponent implements OnInit {
	@Input() formInput : IFormInput = new FormInput();
	@Input() form : FormGroup = new FormGroup( {} );

	
	constructor() { }

	ngOnInit(): void {}

	debug(){
		console.log(`%c ${this.formInput.name}`, 'background-color: gray;');
		
	}

}
