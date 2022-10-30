import { Component, OnInit } from '@angular/core';

@Component( {
	selector    : 'app-inventory',
	templateUrl : './inventory.component.html',
	styleUrls   : ['./inventory.component.css']
} )
export class InventoryComponent implements OnInit {
	
	buttonsTemplate = [ 'Salas', 'Computadoras', 'Componentes' ];
	
	currentSection : 'Salas' | 'Computadoras' | 'Componentes' | string = 'Salas';
	
	constructor() { }

	ngOnInit(): void {
	}
	
	changeSection( newSection:  string  ) {
		this.currentSection = newSection;
	}

}
