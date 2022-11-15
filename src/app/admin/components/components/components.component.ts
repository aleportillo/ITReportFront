import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IComponentItem, ComponentItem } from 'src/app/core/models/inventory/component.model';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { ComponentsService } from 'src/app/core/services/api/components.service';
import { FormService } from 'src/app/core/services/internal/form.service';
import { HelpersService } from 'src/app/core/services/internal/helpers.service';
import { SnackbarService } from 'src/app/core/services/internal/snackbar.service';
import { ModalComponent } from 'src/app/core/shared/components/modal/modal.component';
import components from 'src/assets/jsons/components.json';
@Component( {
	selector    : 'app-components',
	templateUrl : './components.component.html',
	styleUrls   : ['./components.component.css']
} )
export class ComponentsComponent implements OnInit, OnDestroy {

	private _allSubs   : Subscription[]   = [];
	allCardsInventory  : IComponentItem[] = [];
	currentComponent  !: IComponentItem;
	loaderObject       : Loader =  new Loader();
	
	
	
	// -------------------------------------------------- ANCHOR: LIFECYCLE
	
	constructor(
		private _dialog: MatDialog,
		private _formService: FormService,
		private _helperService: HelpersService,
		private _componentsService: ComponentsService,
		private _snackbarService: SnackbarService
	) { }
	
	ngOnInit(): void {
		this.loaderService();
		this.getComponents();		
		this.modalService();
		this.noticeService();
	}
	
	ngOnDestroy() {
		this._allSubs.forEach( ( sub: Subscription ) => {
			sub.unsubscribe();
		} );
	}
	
	
	// -------------------------------------------------- ANCHOR: MODALS
	
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
	
	
	// -------------------------------------------------- ANCHOR: SUBS
	
	modalService(){
		this._allSubs[this._allSubs.length] = this._formService.formData$.subscribe( ( response ) => {
			console.log( response );
			if ( response.newData === null ) { return; }
			if ( response.editData === null ) { return; }
			console.log( 'HERE' );
			this.saveComponent( this.currentComponent, response.newData );
		} );
	}
	
	noticeService(){
		this._allSubs[this._allSubs.length] = this._helperService.noticeModal$.subscribe( ( response ) => {
			if ( !response.delete ) { return; }
			this.deleteComponent( this.currentComponent );
		} );
	}
	
	loaderService(){
		this._helperService.loader$.subscribe( ( response ) => {
			this.loaderObject = response;
		} );
	}
	
	
	// -------------------------------------------------- ANCHOR: API
	
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
		
		this._componentsService.updateComponent( actualData.id, newData ).subscribe(
			data => {
				const actualDataIndex = this.allCardsInventory.findIndex( card => card.id === actualData.id );
				this.allCardsInventory[actualDataIndex] = actualData;
				this._dialog.closeAll();
				this._formService.formData$.next( { newData: null, editData: null } );
				this.currentComponent = new ComponentItem ();
				this._snackbarService.showSnackbar(
					'El componente se ha actualizado correctamente', 
					'success'
				);
			},
			err => {
				this._snackbarService.showSnackbar(
					'SAVE_COMPONENT', 
					'error'
				);
			}
		);
	
		// const actualDataIndex = this.allCardsInventory.findIndex( card => card.id === actualData.id );
		// this.allCardsInventory[actualDataIndex] = actualData;
		// this._dialog.closeAll();
		// this._formService.formData$.next( { newData: null, editData: null } );
		// this.currentComponent = new ComponentItem ();
	}
	
	getComponents(){
		this._componentsService.getComponents().subscribe(
			data => {
				console.log( data );
				this.allCardsInventory = data;
			},
			err => {
				this._snackbarService.showSnackbar(
					'ERR_GET_COMPONENTS', 
					'error'
				);
			}
		);
	}

}
