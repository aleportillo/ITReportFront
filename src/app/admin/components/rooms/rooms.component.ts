import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IRoom, Room } from 'src/app/core/models/inventory/room.model';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import rooms from 'src/assets/jsons/rooms.json';
@Component( {
	selector    : 'app-rooms',
	templateUrl : './rooms.component.html',
	styleUrls   : ['./rooms.component.css']
} )
export class RoomsComponent implements OnInit {

	constructor(
		private _dialog: MatDialog,
		private _formService: FormService,
		private _helperService: HelpersService
	) { }
	
	allCardsInventory : IRoom[] = [];
	currentRoom!: IRoom;
	
	ngOnInit(): void {
		const card = new Room();
		card.id = 1;
		card.edificio = 'Sistemas';
		card.nombre = '700';
		card.totalPC = 30;
		const card2 = new Room();
		card2.id = 2;
		card2.edificio = 'Guillot';
		card2.nombre = '600';
		card2.totalPC = 37;
		const card3 = new Room();
		card3.id = 3;
		card3.edificio = 'Biblioteca';
		card3.nombre = 'Biblioteca';
		card3.totalPC = 2;
		const card4 = new Room();
		card4.id = 4;
		card4.edificio = 'Logistica';
		card4.nombre = '800';
		card4.totalPC = 20;
		this.allCardsInventory = [ card, card2, card3, card4 ];
		// console.log( this.allCardsInventory );
		
		this.modalService();
		this.noticeService();
	}
	
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
	
	modalService(){
		this._formService.formData$.subscribe( ( response ) => {
			console.log( response );
			if ( response.newData === null ) { return; }
			if ( response.editData === null ) { return; }
			console.log( 'HERE' );
			this.saveRoom( this.currentRoom, response.newData );
		} );
	}
	
	noticeService(){
		this._helperService.noticeModal$.subscribe( ( response ) => {
			if ( response.delete ){
				this.deleteRoom( this.currentRoom );
			}
		} );
	}
	
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
	
		const actualDataIndex = this.allCardsInventory.findIndex( card => card.id === actualData.id );
		this.allCardsInventory[actualDataIndex] = actualData;
		this._dialog.closeAll();
		this._formService.formData$.next( { newData: null, editData: null } );
		this.currentRoom = new Room ();
	}

}
