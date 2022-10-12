const INIT_NUMBER_TYPES  = 0;
const DATE_PROPERTIES = ['fechaDeActualzacion'];

export interface IBackendActiveReport {
    [key: string]       : any;
    _id                 : number;
    tipo                : string;
    idTipo              : number;
    incidente           : string;
    categoria           : string;
    fechaDeActualzacion : Date;
    estado              : string;
}

export interface IActiveReport {
    [key: string]       : any;
    _id                 : number;
    tipo                : string;
    idTipo              : number;
    incidente           : string;
    categoria           : string;
    fechaDeActualzacion : Date;
    estado              : string;
}

export class ActiveReport implements IActiveReport {
	static readonly clean = Object.freeze( new ActiveReport() );
    [key: string]       : any;
    _id                        = INIT_NUMBER_TYPES ;
    tipo                       = '';
    idTipo                     = INIT_NUMBER_TYPES ;
    incidente                  = '';
    categoria                  = '';
    fechaDeActualzacion: Date  = new Date();
    estado                     = '';
    
    parse( obj: IBackendActiveReport ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? ActiveReport.clean[key] );
    		}
    		else if ( typeof this[key] === 'number' ){
    			this[key] = Number ( obj[key] ?? ActiveReport.clean[key] );
    		}
    		else if ( DATE_PROPERTIES.indexOf( key ) ) {
    			this[key] = new Date( obj[key] ?? ActiveReport.clean[key] );
    		}
    	} );
        
    	return this;
    }

    set( obj: IActiveReport ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = ActiveReport.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new ActiveReport().set( this );
    }
}
