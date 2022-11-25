import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComponentItem } from 'src/app/core/models/inventory/component.model';
import { IComputer, Computer } from 'src/app/core/models/inventory/computer.model';
import { IRoom } from 'src/app/core/models/inventory/room.model';
import { IFormInput, IFormInputOption } from 'src/app/core/models/tools/form-input.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { ComponentsService } from 'src/app/core/services/api/components.service';
import { ComputersService } from 'src/app/core/services/api/computers.service';
import { RoomsService } from 'src/app/core/services/api/rooms.service';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import computers from 'src/assets/jsons/computers.json';
@Component( {
	selector    : 'app-computers',
	templateUrl : './computers.component.html',
	styleUrls   : ['./computers.component.css']
} )
export class ComputersComponent implements OnInit, OnDestroy {

	private _allSubs   : Subscription[] = [];
	allCardsInventory  : IComputer[]    = [];
	currentComputer   !: IComputer;
	loaderObject       : Loader =  new Loader();
	allFreeComponents  : ComponentItem[] = [];
	hardwareComponents : IFormInputOption[] = [];
	softwareComponents : IFormInputOption[] = [];
	allRooms		   : IFormInputOption[] = [];
	
	@Input() set hasNewElementAdded( value: boolean ) {
		if ( value ){
			setTimeout( () => { this.getComputers(); }, 6000 );
			// this.getRooms();
		}
	}
	
	// -------------------------------------------------- ANCHOR: LIFECYCLE
	
	constructor(
		private _dialog          : MatDialog,
		private _formService     : FormService,
		private _helperService   : HelpersService,
		private _snackbarService : SnackbarService,
		private _computersService: ComputersService,
		private _componentsService: ComponentsService,
		private _roomsService : RoomsService
	) { }
	
	ngOnInit(): void {
		this.getComputers();
		this.modalService();
		this.noticeService();
		this.loaderService();
		this.getFreeComponents();
	}
	
	ngOnDestroy() {
		this._allSubs.forEach( ( sub: Subscription ) => {
			sub.unsubscribe();
		} );
	}
	
	async loadForm( editOptions: any[] ){

		const currentForm = computers;

		await this.getFreeComponents();
		await this.getRooms();
		await this.getComponents();
		
		if ( this.allRooms.length < 1 ){ 
			this._snackbarService.showSnackbar( 'LOAD_FORM', 'error' );
			return null; 
		}
		
		this.hardwareComponents = this.hardwareComponents.concat( editOptions );
		
		currentForm?.forEach( ( input : IFormInput ) => {
			if ( input.name === 'componentsHardware' ){ input.options = this.hardwareComponents; }
			if ( input.name === 'componentesSoftware' ){ input.options = this.softwareComponents; }
			if ( input.name === 'salaId'   ){ input.options = this.allRooms; }
		} );
		
		return currentForm;
	}
	
	
	// -------------------------------------------------- ANCHOR: MODALS
	
	async openEditComputerForm( editComputer : IComputer ){
		
		// editComputer.componentesSoftware = editComputer.software;
		
		const currentForm = await this.loadForm( editComputer.componentsHardware );
		
		if ( !currentForm ) { return; }

		const modalData : IModalData = {
			title       : `Computadora`,
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
		this._formService.formData$.next( { newData: null, editData: editComputer } );
		this.currentComputer = editComputer;
	}
	
	openDeleteComputerModal( deleteComputer: any ){
		
		const modalData : IModalData = {
			title       : `Eliminar`,
			form        : [],
			typeSection : 'pc',
			typeModal   : 'notice',
			labelButton : 'Eliminar',
			noticeData  : `la computadora ${ deleteComputer.gabinete }` 
		}; 

		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.panelClass = 'form';
		dialogConfig.data = modalData;
		this._dialog.open( ModalComponent , dialogConfig );
		this.currentComputer = deleteComputer;
	}
	
	
	// -------------------------------------------------- ANCHOR: SUBS
	
	modalService(){
		this._allSubs[this._allSubs.length] = this._formService.formData$.subscribe( ( response ) => {
			if ( response.newData === null ) { return; }
			if ( response.editData === null ) { return; }
			this.saveComputer( this.currentComputer, response.newData );
		} );
	}
	
	noticeService(){
		this._allSubs[this._allSubs.length] = this._helperService.noticeModal$.subscribe( ( response ) => {
			if ( !response.delete ) { return; }
			if ( this.currentComputer.totalHardware ) { 
				this._snackbarService.showSnackbar(
					'PC_HAS_COMPONENTS', 
					'warning'
				);
				this._helperService.noticeModal$.next( { delete: false } );
				return; 
			}
			this.deleteComputer( this.currentComputer );
		} );
	}
	
	loaderService(){
		this._helperService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}
	
	
	// -------------------------------------------------- ANCHOR: API
	
	deleteComputer( actualComputer: IComputer ){
		this.allCardsInventory = this.allCardsInventory.filter( card => card.id !== actualComputer.id );
		this._dialog.closeAll();
		this._helperService.noticeModal$.next( { delete: false } );
		this.currentComputer = new Computer ();
		
		this._computersService.deleteComputer( actualComputer.id ).subscribe(
			data => {
				this.allCardsInventory = this.allCardsInventory.filter( card => card.id !== actualComputer.id );
				this._dialog.closeAll();
				this._helperService.noticeModal$.next( { delete: false } );
				this.currentComputer = new Computer ();
				this._snackbarService.showSnackbar(
					'DELETE_COMPUTER', 
					'success'
				);
			},
			err => {
				this._snackbarService.showSnackbar(
					'ERR_DELETE_COMPUTER', 
					'error'
				);
			}
		);
		
	}
	
	saveComputer( actualData: IComputer, newData: any ){
		for ( const key in newData ) {
			actualData[key] = newData[key];
		}
		actualData.totalHardware = actualData.componentsHardware.length;
		actualData.totalSoftware = actualData.componentesSoftware.length;
		
		this._computersService.updateElement( actualData.id, newData ).subscribe(
			data =>{
				
				// SOFTWARE
				const newSoftwares : any = [];
				actualData.componentesSoftware.forEach( value => {
					const newValue = this.softwareComponents.find( software => software.value === value );
					if ( newValue ){ newSoftwares.push( newValue ); }
				} );
				actualData.componentesSoftware = [...newSoftwares];
				// HARDWARE
				const newHardwares : any = [];
				actualData.componentsHardware.forEach( value => {
					const newValue = this.hardwareComponents.find( hardware => hardware.value === value );
					if ( newValue ){ newHardwares.push( newValue ); }
				} );
				actualData.componentsHardware = [...newHardwares];
				
				const actualDataIndex = this.allCardsInventory.findIndex( card => card.id === actualData.id );
				this.allCardsInventory[actualDataIndex] = actualData;
				this._dialog.closeAll();
				this._formService.formData$.next( { newData: null, editData: null } );
				this.currentComputer = new Computer ();
				this._snackbarService.showSnackbar(
					'SAVE_COMPUTER', 
					'success'
				);
			}, 
			err =>{
				const error = ( err?.error?.message === 'PC_DUPLICATE' ) ? 'PC_DUPLICATE' : 'SAVE_COMPUTER';
				this._snackbarService.showSnackbar(
					error, 
					'error'
				);
			}
		);
		
	}
	
	getComputers(){
		this._computersService.getComputers().subscribe(
			data => {
				this.allCardsInventory = data;
			},
			err => {
				this._snackbarService.showSnackbar(
					'ERR_GET_PC', 
					'error'
				);
			}
		);
	}
	
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

}
