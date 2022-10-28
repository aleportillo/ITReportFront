import { Component, Input, OnInit } from '@angular/core';
import { IViewInventory, ViewInventory } from 'src/app/core/models/inventory/view-inventory.model';

@Component( {
	selector    : 'app-inventory-card',
	templateUrl : './inventory-card.component.html',
	styleUrls   : ['./inventory-card.component.css']
} )
export class InventoryCardComponent implements OnInit {

	@Input() inventoryData : IViewInventory = new ViewInventory();
	
	constructor() { }

	ngOnInit(): void {
		console.log(this.inventoryData);
		
	}

}
