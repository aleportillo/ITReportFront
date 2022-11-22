import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRoom } from 'src/app/core/models/inventory/room.model';
import { IComputer } from 'src/app/core/models/inventory/computer.model';
import { IViewInventory } from 'src/app/core/models/inventory/view-inventory.model';
import { IComponentItem } from 'src/app/core/models/inventory/component.model';
import { Router } from '@angular/router';

@Component( {
	selector    : 'app-inventory-card',
	templateUrl : './inventory-card.component.html',
	styleUrls   : ['./inventory-card.component.css']
} )
export class InventoryCardComponent implements OnInit {

	@Input() inventoryData!: IViewInventory | IRoom | IComputer | IComponentItem;
	@Input() fromSection = '';
	
	@Output() clickCardEmitter 	= new EventEmitter<any>();
	@Output() clickBadgeEmitter = new EventEmitter<any>();
	
	
	
	constructor(
		private _router: Router
	) { }

	ngOnInit(): void {
		console.log( this.inventoryData );
	}
	
	handleCardClick( event: any ){
		if ( event.target.nodeName === 'SPAN' || event.target.nodeName === 'IMG' ){ return; }
		if ( !this.fromSection ) {return;}
		this.clickCardEmitter.emit( this.inventoryData );
	}
	
	handleBadgeClick(){
		if ( !this.fromSection ) {return;}
		this.clickBadgeEmitter.emit( this.inventoryData );
	}
	
	redirect(){
		// console.log(this._router.url);
		sessionStorage.setItem( 'IT_REPORT', this._router.url );
		this._router.navigate( [`/computadora/${ this.inventoryData.title }`] );
	}

}
