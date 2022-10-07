export interface IBackendReport {
    [key: string]     : any;
    comentarios      ?: string;
    categoria         : string;
    incidente         : string;
}

export interface IReport {
    [key: string]     : any;
    comentarios      ?: string;
    categoria         : string;
    incidente         : string;
}

export class Report implements IReport {
	static readonly clean = Object.freeze( new Report() );
    [key: string]      : any;
    comentarios        = '';
    categoria          = '';
    incidente          = '';
    
    parse( obj: IBackendReport ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? Report.clean[key] );
    		}
    	} );
        
    	return this;
    }

    set( obj: IReport ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = Report.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new Report().set( this );
    }
}
