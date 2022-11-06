export interface SaveComponentItem {
    nombre            : string;
    tipo              : 'hardware' | 'software';
    numero            : string;
}

export interface IBackendComponentItem {
    id                  : number;
    nombre              : string;
    tipo                : string;
    numero              : string;
}

export interface IComponentItem {
    [key: string]       : any;
    id                  : number;
    nombre              : string;
    tipo                : string;
    numero              : string;
}

export class ComponentItem implements IComponentItem {
	static readonly clean = Object.freeze( new ComponentItem() );
    [key: string]      : any;
    id                  = 0 ;
    nombre              = '';
    tipo                = '';
    numero              = '';
    
    parse( obj: IComponentItem ) {
        
    	Object.keys( this ).forEach( key => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? ComponentItem.clean[key] );
    		}
    		else if ( typeof this[key] === 'number' ){
    			this[key] = Number ( obj[key] ?? ComponentItem.clean[key] );
    		}
    		else if ( typeof this[key] === 'boolean' ){
    			this[key] = Boolean ( obj[key] ?? ComponentItem.clean[key] );
    		}
    		else {
    			this[key] =  ( obj[key] ?? ComponentItem.clean[key] );
    		}
    	} );
        
    	return this;
    }

    set( obj: IComponentItem ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = ComponentItem.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new ComponentItem().set( this );
    }
}

