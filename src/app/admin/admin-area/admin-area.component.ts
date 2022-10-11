import { Component, OnInit } from '@angular/core';

@Component( {
	selector    : 'app-admin-area',
	templateUrl : './admin-area.component.html',
	styleUrls   : ['./admin-area.component.css']
} )
export class AdminAreaComponent implements OnInit {
	currentSection = '';

	constructor() { }

	ngOnInit(): void {
	}

	changeSection(section: string){
		this.currentSection = section;
	}

}
