import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormInput, FormInput } from 'src/app/core/models/tools/form-input.model';

@Component( {
	selector    : 'app-input-area',
	templateUrl : './input-area.component.html',
	styleUrls   : ['./input-area.component.css']
} )
export class InputAreaComponent implements OnInit {
	@Input() formInput : IFormInput = new FormInput();
	@Input() form : FormGroup = new FormGroup( {} );

	constructor() { }

	ngOnInit(): void {
	}
	
	debug(){
		console.log(`%c ${this.formInput.name}`, 'background-color: gray;');
	}
}
