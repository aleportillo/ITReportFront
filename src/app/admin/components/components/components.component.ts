import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IComponentItem, ComponentItem } from 'src/app/core/models/inventory/component.model';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import components from 'src/assets/jsons/components.json';
@Component( {
	selector    : 'app-components',
	templateUrl : './components.component.html',
	styleUrls   : ['./components.component.css']
} )
export class ComponentsComponent implements OnInit {

	constructor(
		private _dialog: MatDialog,
		private _formService: FormService,
		private _helperService: HelpersService
	) { }
	
	currentComponent!: IComponentItem;
	allCardsInventory : IComponentItem[] = [];
	
	ngOnInit(): void {
		
		const card = new ComponentItem();
		card.id = 1;
		card.nombre = 'Cable';
		card.numero = '12313';
		card.tipo = 'hardware';
		
		const card2 = new ComponentItem();
		card2.id = 2;
		card2.nombre = 'Java';
		card2.numero = 'cdsd';
		card2.tipo = 'software';
		
		const card3 = new ComponentItem();
		card3.id = 3;
		card3.nombre = 'Cable 2';
		card3.numero = '1231s3';
		card3.tipo = 'hardware';
		
		const card4 = new ComponentItem();
		card4.id = 4;
		card4.nombre = 'Monitor';
		card4.numero = 'W12313';
		card4.tipo = 'hardware';
		
		this.allCardsInventory = [ card, card2, card3, card4 ];
		console.log( this.allCardsInventory );
		
		this.modalService();
		this.noticeService();
	}
	
	openEditComponentForm( editComponent : any ){
		console.log( editComponent );
		const currentForm = components;
		const modalData : IModalData = {
			title       : `Componente`,
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
		this._formService.formData$.next( { newData: null, editData: editComponent } );
		this.currentComponent = editComponent;
	}
	openDeleteComponentModal( deleteComponent : any ){
		console.log( deleteComponent );
		const modalData : IModalData = {
			title       : `Eliminar`,
			form        : [],
			typeSection : 'component',
			typeModal   : 'notice',
			labelButton : 'Eliminar',
			noticeData  : `el componente ${ deleteComponent.nombre }` 
		}; 

		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.panelClass = 'form';
		dialogConfig.data = modalData;
		this._dialog.open( ModalComponent , dialogConfig );
		this.currentComponent = deleteComponent;
	}
	
	modalService(){
		this._formService.formData$.subscribe( ( response ) => {
			console.log( response );
			if ( response.newData === null ) { return; }
			if ( response.editData === null ) { return; }
			console.log( 'HERE' );
			this.saveComponent( this.currentComponent, response.newData );
		} );
	}
	
	noticeService(){
		this._helperService.noticeModal$.subscribe( ( response ) => {
			if ( response.delete ){
				this.deleteComponent( this.currentComponent );
			}
		} );
	}
	
	deleteComponent( actualComponent: any ){
		this.allCardsInventory = this.allCardsInventory.filter( card => card.id !== actualComponent.id );
		this._dialog.closeAll();
		this._helperService.noticeModal$.next( { delete: false } );
		this.currentComponent = new ComponentItem ();
	}
	
	saveComponent( actualData: any, newData: any ){

		for ( const key in newData ) {
			actualData[key] = newData[key];
		}
	
		const actualDataIndex = this.allCardsInventory.findIndex( card => card.id === actualData.id );
		this.allCardsInventory[actualDataIndex] = actualData;
		this._dialog.closeAll();
		this._formService.formData$.next( { newData: null, editData: null } );
		this.currentComponent = new ComponentItem ();
	}

}
