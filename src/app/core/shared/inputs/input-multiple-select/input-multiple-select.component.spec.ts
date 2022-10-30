import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultipleSelectComponent } from './input-multiple-select.component';

describe( 'InputMultipleSelectComponent', () => {
	let component: InputMultipleSelectComponent;
	let fixture: ComponentFixture<InputMultipleSelectComponent>;

	beforeEach( async () => {
		await TestBed.configureTestingModule( {
			declarations : [InputMultipleSelectComponent]
		} )
			.compileComponents();
	} );

	beforeEach( () => {
		fixture = TestBed.createComponent( InputMultipleSelectComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );
} );
