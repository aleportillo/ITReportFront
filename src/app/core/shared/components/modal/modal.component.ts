import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModalData } from 'src/app/core/models/tools/modal-data';

@Component( {
	selector    : 'app-modal',
	templateUrl : './modal.component.html',
	styleUrls   : ['./modal.component.css']
} )
export class ModalComponent implements OnInit {

	modalData: IModalData;

	constructor(
		private _dialogRef: MatDialogRef<ModalComponent>,
        @Inject( MAT_DIALOG_DATA ) data : IModalData
	) {
		this.modalData = data;
		console.log(data);
		
	}

	ngOnInit(): void {
	}
	
	closeModal(){
		// this.dialogRef.close();
		// dialogRef.afterClosed().subscribe(
		// data => console.log("Dialog output:", data)
		// );
		this._dialogRef.close();
	}
}
