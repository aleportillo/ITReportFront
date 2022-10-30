import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';

@Component( {
	selector    : 'app-modal',
	templateUrl : './modal.component.html',
	styleUrls   : ['./modal.component.css']
} )
export class ModalComponent implements OnInit {

	modalData: IModalData;
	form : FormGroup  = new FormGroup( {} );
	editData : any = null;

	loaderObject : Loader =  new Loader();

	constructor(
		private _formService : FormService,
		private _dialogRef: MatDialogRef<ModalComponent>,
        @Inject( MAT_DIALOG_DATA ) data : IModalData,
		private _helpersService : HelpersService
	) {
		this.modalData = data;
		// console.log( data );
	}

	ngOnInit(): void {
		this.formDataSuscribe();
		this.loaderSuscribe();
		this.form = this._formService.createForm( this.modalData.form );
	}

	primaryAction(){
		// console.log(this.modalData.typeModal);
		
		// console.log( this.form.value );
		
		if ( 
			this.loaderObject.createReport || this.loaderObject.saveRoom ||
			this.loaderObject.saveComponent 
		) { return; }
		
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
			const REPORT_ID = 1;
			incidenteField.options =  incidenteField?.allOptions[event === REPORT_ID ? 'reporte' : 'solicitud'];
			this.form.get( 'incidente' )?.reset();
		}
	}

	formDataSuscribe(){
		this._formService.formData$.subscribe( ( response ) => {
			// if(!response.editData && !response.newData){
			// 	this.closeModal();
			// }
		} );
	}

	loaderSuscribe(){
		this._helpersService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}
}
