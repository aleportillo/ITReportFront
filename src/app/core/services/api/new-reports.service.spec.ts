import { TestBed } from '@angular/core/testing';

import { NewReportsService } from './new-reports.service';

describe( 'NewReportsService', () => {
	let service: NewReportsService;

	beforeEach( () => {
		TestBed.configureTestingModule( {} );
		service = TestBed.inject( NewReportsService );
	} );

	it( 'should be created', () => {
		expect( service ).toBeTruthy();
	} );
} );
