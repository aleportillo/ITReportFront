import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRoom } from 'src/app/core/models/inventory/room.model';
import { IViewInventory, ViewInventory } from 'src/app/core/models/inventory/view-inventory.model';

@Component( {
	selector    : 'app-inventory-card',
	templateUrl : './inventory-card.component.html',
	styleUrls   : ['./inventory-card.component.css']
} )
export class InventoryCardComponent implements OnInit {

	@Input() inventoryData!: IViewInventory | IRoom;
	@Input() fromSection = '';
	
	@Output() clickCardEmitter 	= new EventEmitter<any>();
	@Output() clickBadgeEmitter = new EventEmitter<string>();
	
	
	
	constructor() { }

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
		this.clickBadgeEmitter.emit( this.inventoryData.id );
	}

}
