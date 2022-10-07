import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormInput } from 'src/app/core/models/tools/form-input.modal';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { FormService } from 'src/app/core/services/internal/form.service';

@Component( {
	selector    : 'app-modal',
	templateUrl : './modal.component.html',
	styleUrls   : ['./modal.component.css']
} )
export class ModalComponent implements OnInit {

	modalData: IModalData;
	form : FormGroup  = new FormGroup( {} );
	editData : any = null;

	constructor(
		private _formService : FormService,
		private _dialogRef: MatDialogRef<ModalComponent>,
        @Inject( MAT_DIALOG_DATA ) data : IModalData
	) {
		this.modalData = data;
		// console.log( data );
	}

	ngOnInit(): void {
		this.form = this._formService.createForm( this.modalData.form );
	}

	primaryAction(){
		// console.log(this.modalData.typeModal);
		
		// console.log( this.form.value );
		this._formService.formData$.next( {
			newData  : { ...this.form.value },
			editData : ( this.editData ) ? { ...this.editData } : null 
		} );		
	}
	
	closeModal(){
		// this.dialogRef.close();
		// dialogRef.afterClosed().subscribe(
		// data => console.log("Dialog output:", data)
		// );
		this._dialogRef.close();
	}

	changeOption( input: IFormInput, event: any ){
		if ( input.name === 'categoria' ){
			const incidenteField = this.modalData.form.find( ( field : IFormInput ) => field.name === 'incidente' );
			if ( !incidenteField ) { return; }
			incidenteField.options =  incidenteField?.allOptions[event];
			this.form.get( 'incidente' )?.reset();
		}
	}
}
