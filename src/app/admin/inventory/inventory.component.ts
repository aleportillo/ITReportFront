import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IRoom, SaveRoom } from 'src/app/core/models/inventory/room.model';
import { IFormInput, IFormInputOption } from 'src/app/core/models/tools/form-input.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { RoomsService } from 'src/app/core/services/api/rooms.service';
import { FormService } from 'src/app/core/services/internal/form.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import { ComponentsService } from 'src/app/core/services/api/components.service';
import { ComputersService } from 'src/app/core/services/api/computers.service';
import rooms from 'src/assets/jsons/rooms.json';
import components from 'src/assets/jsons/components.json';
import computers from 'src/assets/jsons/computers.json';
import { ComponentItem } from 'src/app/core/models/inventory/component.model';

@Component( {
	selector    : 'app-inventory',
	templateUrl : './inventory.component.html',
	styleUrls   : ['./inventory.component.css']
} )
export class InventoryComponent implements OnInit {
	
	buttonsTemplate = [ 
		{ text: 'Salas', form: rooms },
		{ text: 'Computadoras', form: computers },
		// { text: 'Componentes', form: components }
	];
	
	currentSection : 'Salas' | 'Computadoras' | 'Componentes' | string = 'Computadoras';
	hasNewElementAdded = false;
	allFreeComponents  : ComponentItem[] = [];
	hardwareComponents : IFormInputOption[] = [];
	softwareComponents : IFormInputOption[] = [];
	allRooms		   : IFormInputOption[] = [];
	
	constructor(
		private _dialog: MatDialog,
		private _formService: FormService,
		private _roomsService: RoomsService,
		private _componentsService: ComponentsService,
		private _computersService: ComputersService,
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
			if ( response.newData === null ) { return; }
			if ( response.editData !== null ) { return; }
			this.saveElement( response.newData );
		} );
	}
	
	
	// -------------------------------------------------- ANCHOR: API
	
	getFreeComponents(){
		return new Promise<string>( ( resolve, reject ) => {
			this._componentsService.getFreeComponents().subscribe(
				data => {
					this.allFreeComponents = data;
					this.hardwareComponents = this.allFreeComponents.filter( item => item.categoriaId === 2 )
						.map( item => { return { text: item.nombre, value: item.id }; } );
					resolve( 'success' );
				},
				err => { reject( 'error' ); }
			);
		} );
	}
	
	getComponents(){
		return new Promise<string>( ( resolve, reject ) => {
			this._componentsService.getComponents().subscribe(
				data => {
					this.softwareComponents = data.filter( ( item : any ) => item.categoriaId === 1 )
						.map( ( item : any ) => { return { text: item.nombre, value: item.id }; } );
					resolve( 'success' );
				},
				err => { reject( 'error' ); }
			);
		} );
	}
	
	getRooms(){
		return new Promise<string>( ( resolve, reject ) => {
			this._roomsService.getRooms().subscribe(
				data => {
					this.allRooms = data.map( ( item : IRoom ) => { return { text: item.nombre, value: item.id }; } );
					resolve( 'success' );
				},
				err => { reject( 'error' ); }
			);
		} );
	}
	
	saveElement( saveData : any ){
		this.hasNewElementAdded = false;
		switch ( this.currentSection ){
			case 'Salas': this.saveRoom( saveData ); break;
			case 'Computadoras': this.saveComputer( saveData ); break;
			case 'Componentes': this.saveComponent( saveData ); break;
		}
	}
	
	saveRoom( saveData: any ){
		const saveElement : SaveRoom = {
			nombre   : saveData.nombre,
			edificio : saveData.edificio
		};
		this._roomsService.saveElement( saveElement ).subscribe(
			( res ) => {
				this.hasNewElementAdded = true;
				this._snackbarService.showSnackbar( 'SAVE_ROOM', 'success' );
				this._dialog.closeAll();
			}, 
			( err ) => {
				this._snackbarService.showSnackbar( 'SAVE_ROOM', 'error' );
			}
		);
	}
	
	saveComponent( saveData: any ){
		this._componentsService.saveElement( { ...saveData } ).subscribe(
			( res ) => {
				this.hasNewElementAdded = true;
				this._snackbarService.showSnackbar( 'SAVE_COMPONENT', 'success' );
				this._dialog.closeAll();
			}, 
			( err ) => {
				this._snackbarService.showSnackbar( 'SAVE_COMPONENT', 'error' );
			}
		);
	}
	
	saveComputer( saveData: any ){
		this._computersService.saveElement( { ...saveData } ).subscribe(
			( res ) => {
				this.hasNewElementAdded = true;
				this._snackbarService.showSnackbar( 'SAVE_COMPUTER', 'success' );
				this._dialog.closeAll();
			}, 
			( err ) => {
				this._snackbarService.showSnackbar( 'SAVE_COMPUTER', 'error' );
			}
		);
	}
	
	
	
	// -------------------------------------------------- ANCHOR: FORM
	
	async openForm(){
		
		const currentForm = await this.loadForm();
		
		if ( !currentForm ) { return; }
		
		const FIRST_ELEMENT = 0;
		const LAST_POSITION = 1;
		const modalData : IModalData = {
			title       : `${ this.currentSection.substring( FIRST_ELEMENT, this.currentSection.length - LAST_POSITION ) }`,
			form        : currentForm as IFormInput[],
			typeSection : '',
			typeModal   : 'form',
			labelButton : 'Guardar'
		}; 

		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.panelClass = 'form';
		dialogConfig.data = modalData;

		this._dialog.open( ModalComponent , dialogConfig );
		
	}
	
	async loadForm(){

		const currentForm = this.buttonsTemplate.find( element => element.text === this.currentSection )?.form;
		if ( this.currentSection !== 'Computadoras' ) { return currentForm; }
		
		await this.getFreeComponents();
		await this.getRooms();
		await this.getComponents();
		
		if ( this.allRooms.length < 1 ){ 
			this._snackbarService.showSnackbar( 'LOAD_FORM', 'error' );
			return null; 
		}
		
		currentForm?.forEach( ( input : IFormInput ) => {
			if ( input.name === 'componentsHardware' ){ input.options = this.hardwareComponents; }
			if ( input.name === 'componentesSoftware' ){ input.options = this.softwareComponents; }
			if ( input.name === 'salaId'   ){ input.options = this.allRooms; }
		} );
		
		return currentForm;
	}
	
}
