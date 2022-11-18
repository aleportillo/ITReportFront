import { IIncident } from '../incident.model';
import { categoria, estado } from '../tools/tool-interface.model';

export interface IBackendViewInventory {
    [key: string]     : any;
    // id                : number; 
    // fechaDeInventorye    : Date;
    // estado            : estado;
    // comentariosInventorye?: string;
    // comentariosAdmin  ?: string;

    // incidente         : IIncident;
    
    categoriaId       ?: number;
    nombre            ?: string;
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
        
    	this.title = obj.categoriaId === 1 ? 'software' : 'hardware';
    	this.subtitle1 = obj.nombre ?? '';
    	this.type = obj.categoriaId === 1 ? 'software' : 'hardware';

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
