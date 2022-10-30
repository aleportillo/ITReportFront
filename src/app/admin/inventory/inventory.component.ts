import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveRoom } from 'src/app/core/models/inventory/room.model';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { RoomsService } from 'src/app/core/services/api/rooms.service';
import { FormService } from 'src/app/core/services/internal/form.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import rooms from 'src/assets/jsons/rooms.json';

@Component( {
	selector    : 'app-inventory',
	templateUrl : './inventory.component.html',
	styleUrls   : ['./inventory.component.css']
} )
export class InventoryComponent implements OnInit {
	
	buttonsTemplate = [ 
		{ text: 'Salas', form: rooms },
		{ text: 'Computadoras', form: rooms },
		{ text: 'Componentes', form: rooms }
	];
	
	currentSection : 'Salas' | 'Computadoras' | 'Componentes' | string = 'Salas';
	
	constructor(
		private _dialog: MatDialog,
		private _formService: FormService,
		private _roomsService: RoomsService,
		private _snackbarService: SnackbarService
	) { }

	ngOnInit(): void { 
		this.modalService();
	}
	
	changeSection( newSection: string  ) {
		this.currentSection = newSection;
	}
	
	// -------------------------------------------------- ANCHOR: SUBS
	
	modalService(){
		this._formService.formData$.subscribe( ( response ) => {
			console.log( response );
			if ( response.newData === null ) { return; }
			if ( response.editData !== null ) { return; }
			console.log( 'HERE' );
			this.saveElement( response.newData );
		} );
	}
	
	
	// -------------------------------------------------- ANCHOR: API
	
	saveElement( saveData : any ){
		switch ( this.currentSection ){
			case 'Salas': this.saveRoom( saveData ); break;
			case 'Computadoras':  break;
			case 'Componentes': break;
		}
	}
	
	saveRoom( saveData: any ){
		const saveElement : SaveRoom = {
			nombre   : saveData.numero,
			edificio : saveData.edificio
		};
		this._roomsService.saveElement( saveElement ).subscribe(
			( res ) => {
				console.log( res );
				this._snackbarService.showSnackbar( 'La sala fue guardada correctamente.', 'success' );
				this._dialog.closeAll();
			}, 
			( err ) => {
				this._snackbarService.showSnackbar( 'SAVE_REPORT', 'error' );
			}
		);
	}
	
	
	
	// -------------------------------------------------- ANCHOR: FORM
	
	openForm(){
		const FIRST_ELEMENT = 0;
		const LAST_POSITION = 1;
		const currentForm = this.buttonsTemplate.find( element => element.text === this.currentSection )?.form;
		const modalData : IModalData = {
			title       : `${ this.currentSection.substring( FIRST_ELEMENT, this.currentSection.length - LAST_POSITION ) }`,
			form        : currentForm as IFormInput[],
			values      : [],
			typeSection : '',
			typeModal   : 'form',
			labelButton : 'Reportar'
		}; 

		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.panelClass = 'form';
		dialogConfig.data = modalData;

		this._dialog.open( ModalComponent , dialogConfig );
		
	}
	
}
