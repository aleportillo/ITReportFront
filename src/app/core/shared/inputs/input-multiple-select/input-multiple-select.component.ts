import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormInput, FormInput } from 'src/app/core/models/tools/form-input.model';

@Component( {
	selector    : 'app-input-multiple-select',
	templateUrl : './input-multiple-select.component.html',
	styleUrls   : ['./input-multiple-select.component.css']
} )
export class InputMultipleSelectComponent implements OnInit {
	
	@Input() formInput : IFormInput = new FormInput();
	@Input() form : FormGroup = new FormGroup( {} );
	@Output() changeOptionEmmiter = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void {
	}
	
	changeOption( event: any ){
		// console.log(event);
		this.changeOptionEmmiter.emit( event.value );
	}

}
