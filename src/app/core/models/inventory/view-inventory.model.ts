import { IIncident } from '../incident.model';
import { categoria, estado } from '../tools/tool-interface.model';

export interface IBackendViewInventory {
    [key: string]     : any;
    id                : number; 
    fechaDeInventorye    : Date;
    estado            : estado;
    comentariosInventorye?: string;
    comentariosAdmin  ?: string;
    categoria         : categoria;
    incidente         : IIncident;
}

export interface IViewInventory {
    [key: string]     : any;
    type              : string;
    title             : string;
    subtitle1         : string;
    subtitle2         : string;
}

export class ViewInventory implements IViewInventory {
	static readonly clean = Object.freeze( new ViewInventory() );
    [key: string]      : any;
    type               = '';
    title              = '';
    subtitle1          = '';
    subtitle2          = '';
    
    parse( obj: IBackendViewInventory ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? ViewInventory.clean[key] );
    		}
    		else if ( typeof this[key] === 'number' ){
    			this[key] = Number ( obj[key] ?? ViewInventory.clean[key] );
    		}
    		else if ( typeof this[key] === 'boolean' ){
    			this[key] = Boolean ( obj[key] ?? ViewInventory.clean[key] );
    		}
    	} );

    	return this;
    }

    set( obj: IViewInventory ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = ViewInventory.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new ViewInventory().set( this );
    }
}
