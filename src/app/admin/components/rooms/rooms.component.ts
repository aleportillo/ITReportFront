import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IRoom, Room } from 'src/app/core/models/inventory/room.model';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { RoomsService } from 'src/app/core/services/api/rooms.service';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import rooms from 'src/assets/jsons/rooms.json';
@Component( {
	selector    : 'app-rooms',
	templateUrl : './rooms.component.html',
	styleUrls   : ['./rooms.component.css']
} )
export class RoomsComponent implements OnInit, OnDestroy {
	
	private _allSubs   : Subscription[] = [];
	allCardsInventory  : IRoom[]        = [];
	currentRoom       !: IRoom;
	loaderObject       : Loader =  new Loader();
	
	@Input() set hasNewElementAdded( value: boolean ) {
		console.log(value)
		if ( value ){
			setTimeout( () => { this.getRooms(); }, 6000 );
			// this.getRooms();
		}
	}
	
	 
	// -------------------------------------------------- ANCHOR: LIFECYCLE
	
	constructor(
		private _dialog         : MatDialog,
		private _formService    : FormService,
		private _helperService  : HelpersService,
		private _snackbarService: SnackbarService,
		private _roomsService   : RoomsService
	) { }
	
	ngOnInit(): void {
		this.getRooms();
		this.modalService();
		this.noticeService();
		this.loaderService();
	}
	
	ngOnDestroy(): void {
		this._allSubs.forEach( ( sub: Subscription ) => {
			sub.unsubscribe();
		} );
	}
	
	
	// -------------------------------------------------- ANCHOR: MODALS
	
	openEditRoomForm( editRoom : IRoom ){
		// console.log( editRoom );
		const currentForm = rooms;
		const modalData : IModalData = {
			title       : `Sala`,
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
		this._formService.formData$.next( { newData: null, editData: editRoom } );
		this.currentRoom = editRoom;
	}
	
	openDeleteRoomModal( deleteRoom: any ){
		// console.log( deleteRoom );
		const modalData : IModalData = {
			title       : `Eliminar`,
			form        : [],
			typeSection : 'room',
			typeModal   : 'notice',
			labelButton : 'Eliminar',
			noticeData  : `la sala ${ deleteRoom.nombre }` 
		}; 

		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.panelClass = 'form';
		dialogConfig.data = modalData;
		this._dialog.open( ModalComponent , dialogConfig );
		this.currentRoom = deleteRoom;
	}
	
	
	// -------------------------------------------------- ANCHOR: SUBS
	
	modalService(){
		this._allSubs[this._allSubs.length] = this._formService.formData$.subscribe( ( response ) => {
			console.log( response );
			if ( response.newData === null ) { return; }
			if ( response.editData === null ) { return; }
			console.log( 'HERE' );
			this.saveRoom( this.currentRoom, response.newData );
		} );
	}
	
	noticeService(){
		this._allSubs[this._allSubs.length] = this._helperService.noticeModal$.subscribe( ( response ) => {
			if ( !response.delete ) { return; }
			if ( this.currentRoom.totalPC ) {
				this._snackbarService.showSnackbar(
					'No es posible eliminar la sala, ya que aún tiene computadoras asociados', 
					'warning'
				);
				this._helperService.noticeModal$.next( { delete: false } );
				return;
			}
			if ( response.delete ){
				this.deleteRoom( this.currentRoom );
			}
		} );
	}
	
	loaderService(){
		this._helperService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}
	
	
	// -------------------------------------------------- ANCHOR: API
	
	deleteRoom( actualRoom: IRoom ){
		this.allCardsInventory = this.allCardsInventory.filter( card => card.id !== actualRoom.id );
		this._dialog.closeAll();
		this._helperService.noticeModal$.next( { delete: false } );
		this.currentRoom = new Room ();
	}
	
	saveRoom( actualData: IRoom, newData: any ){

		for ( const key in newData ) {
			actualData[key] = newData[key];
		}
		
		this._roomsService.updateRoom( actualData.id, newData ).subscribe(
			data => {
				const actualDataIndex = this.allCardsInventory.findIndex( card => card.id === actualData.id );
				this.allCardsInventory[actualDataIndex] = actualData;
				this._dialog.closeAll();
				this._formService.formData$.next( { newData: null, editData: null } );
				this.currentRoom = new Room ();
				this._snackbarService.showSnackbar(
					'La sala se ha actualizado correctamente', 
					'success'
				);
			},
			err => {
				this._snackbarService.showSnackbar(
					'SAVE_ROOMS', 
					'error'
				);
			}
		);
	
	}
	
	getRooms(){
		this._roomsService.getRooms().subscribe(
			data => {
				this.allCardsInventory = data;
			},
			err => {
				this._snackbarService.showSnackbar(
					'ERR_GET_ROOMS', 
					'error'
				);
			}
		)
	}

}
