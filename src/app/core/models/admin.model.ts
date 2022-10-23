export interface IBackendAdmin {
    [key: string] : any;
    nombre        : string;
    apellido      : string;
    usuario       : string;
    password     ?: string;
    newPassword  ?: string;
}

export interface IAdmin {
    [key: string] : any;
    nombre        : string;
    apellido      : string;
    usuario       : string;
    password     ?: string;
    newPassword  ?: string;
}

export class Admin implements IAdmin {
	static readonly clean = Object.freeze( new Admin() );
    [key: string]  : any;
    nombre         = '';
    apellido       = '';
    usuario        = '';
    password     ? = '';
    newPassword  ? = '';
    
    parse( obj: IBackendAdmin ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? Admin.clean[key] );
    		}
    	} );
        
    	return this;
    }

    set( obj: IAdmin ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = Admin.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new Admin().set( this );
    }
}
