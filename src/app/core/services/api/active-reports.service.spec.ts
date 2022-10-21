import { TestBed } from '@angular/core/testing';

import { ActiveReportsService } from './active-reports.service';

describe( 'ActiveReportsService', () => {
	let service: ActiveReportsService;

	beforeEach( () => {
		TestBed.configureTestingModule( {} );
		service = TestBed.inject( ActiveReportsService );
	} );

	it( 'should be created', () => {
		expect( service ).toBeTruthy();
	} );
} );
