export interface SaveRoom {
    nombre            : string;
    edificio          : string;
}

export interface IBackendRoom {
    [key: string]   : any;
    id              : number;
    nombre          : string;
    edificio        : string;
    computadoras    : any;
}

export interface IRoom {
    [key: string]     : any;
    id                : number;
    nombre            : string;
    edificio          : string;
    totalPC           : number;
}

export class Room implements IRoom {
	static readonly clean = Object.freeze( new Room() );
    [key: string]      : any;
    id                 = 0 ;
    nombre             = '';
    edificio           = '';
    totalPC            = 0 ;
    
    parse( obj: IBackendRoom ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? Room.clean[key] );
    		}
    		else if ( typeof this[key] === 'number' ){
    			this[key] = Number ( obj[key] ?? Room.clean[key] );
    		}
    		else if ( typeof this[key] === 'boolean' ){
    			this[key] = Boolean ( obj[key] ?? Room.clean[key] );
    		}
    	} );
        
    	this.totalPC = obj?.computadoras?.length ?? 0;
    	return this;
    }

    set( obj: IRoom ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = Room.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new Room().set( this );
    }
}
