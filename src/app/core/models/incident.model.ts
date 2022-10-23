import { categoria } from './tools/tool-interface.model';

const INIT_VALUE = 0;

export interface IBackendIncident {
    [key: string]     : any;
    categoriaReporte  : categoria;
    categoriaReporteId: number;
    id                : number;
    nombre            : string;
}

export interface IIncident {
    [key: string]     : any;
    categoriaReporte  : categoria;
    categoriaReporteId: number;
    id                : number;
    nombre            : string;
}

export class Incident implements IIncident {
	static readonly clean = Object.freeze( new Incident() );
    [key: string]     : any;
    categoriaReporte  : categoria = { id: INIT_VALUE, nombre: '' };
    categoriaReporteId = INIT_VALUE;
    id                 = INIT_VALUE;
    nombre             = '';
    
    parse( obj: IBackendIncident ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? Incident.clean[key] );
    		}
    	} );
        
    	return this;
    }

    set( obj: IIncident ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = Incident.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new Incident().set( this );
    }
}
