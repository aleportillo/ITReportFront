import { categoria } from './tools/tool-interface.model';

const INIT_VALUE = 0;

export interface IBackendDashboard {
    [key: string]       : any;
    computadoras        : number;
    salas               : number;
    reportes            : number;
    reportesAtendiendose: number;
    reportesFinalizados : number;
    reportesDetenidos   : number;
    reportesPendientes  : number;
}

export interface IDashboard {
    [key: string]       : any;
    computadoras        : number;
    salas               : number;
    reportes            : number;
    reportesAtendiendose: number;
    reportesFinalizados : number;
    reportesDetenidos   : number;
    reportesPendientes  : number;
}

export class Dashboard implements IDashboard {
	static readonly clean = Object.freeze( new Dashboard() );
    [key: string]       : any;
    computadoras         = 0;
    salas                = 0;
    reportes             = 0;
    reportesAtendiendose = 0;
    reportesFinalizados  = 0;
    reportesDetenidos    = 0;
    reportesPendientes   = 0;
    
    parse( obj: IBackendDashboard ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? Dashboard.clean[key] );
    		} else if ( typeof this[key] === 'number' ){
    			this[key] = Number ( obj[key] ?? Dashboard.clean[key] );
    		}
    	} );
        
    	return this;
    }

    set( obj: IDashboard ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = Dashboard.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new Dashboard().set( this );
    }
}
