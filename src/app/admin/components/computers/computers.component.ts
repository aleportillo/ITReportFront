import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComponentItem } from 'src/app/core/models/inventory/component.model';
import { IComputer, Computer } from 'src/app/core/models/inventory/computer.model';
import { IFormInput } from 'src/app/core/models/tools/form-input.model';
import { Loader } from 'src/app/core/models/tools/loader.model';
import { IModalData } from 'src/app/core/models/tools/modal-data';
import { ComponentsService } from 'src/app/core/services/api/components.service';
import { ComputersService } from 'src/app/core/services/api/computers.service';
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
	
	
	// -------------------------------------------------- ANCHOR: LIFECYCLE
	
	constructor(
		private _dialog          : MatDialog,
		private _formService     : FormService,
		private _helperService   : HelpersService,
		private _snackbarService : SnackbarService,
		private _computersService: ComputersService,
		private _componentsService: ComponentsService
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
	
	
	// -------------------------------------------------- ANCHOR: MODALS
	
	openEditComputerForm( editComputer : IComputer ){
		console.log( editComputer );
		const currentForm = computers;
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
		console.log( deleteComputer );
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
			console.log( response );
			if ( response.newData === null ) { return; }
			if ( response.editData === null ) { return; }
			console.log( 'HERE' );
			this.saveComputer( this.currentComputer, response.newData );
		} );
	}
	
	noticeService(){
		this._allSubs[this._allSubs.length] = this._helperService.noticeModal$.subscribe( ( response ) => {
			if ( !response.delete ) { return; }
			if ( this.currentComputer.totalHardware || this.currentComputer.totalSoftware ) { 
				this._snackbarService.showSnackbar(
					'No es posible eliminar la computadora, ya que aún tiene componentes asociados', 
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
	}
	
	saveComputer( actualData: IComputer, newData: any ){

		for ( const key in newData ) {
			actualData[key] = newData[key];
		}
		actualData.totalHardware = actualData.hardware.length;
		actualData.totalSoftware = actualData.software.length;
	
		const actualDataIndex = this.allCardsInventory.findIndex( card => card.id === actualData.id );
		this.allCardsInventory[actualDataIndex] = actualData;
		this._dialog.closeAll();
		this._formService.formData$.next( { newData: null, editData: null } );
		this.currentComputer = new Computer ();
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
		this._componentsService.getFreeComponents().subscribe(
			data => {
				console.log( data );
				this.allFreeComponents = data;
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
