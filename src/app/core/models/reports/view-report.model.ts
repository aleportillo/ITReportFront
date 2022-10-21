const INIT_NUMBER_TYPES  = 0;
const DATE_PROPERTIES = ['fechaDeReporte'];

export interface IBackendViewReport {
    [key: string]     : any;
    _id               : number;
    fechaDeReporte    : Date;
    estado            : string;
    comentariosReporte?: string;
    comentariosAdmin  ?: string;
    categoria         : string;
    incidente         : string;
}

export interface IViewReport {
    [key: string]     : any;
    _id               : number;
    fechaDeReporte    : Date;
    estado            : string;
    comentariosReporte?: string;
    comentariosAdmin  ?: string;
    categoria         : string;
    incidente         : string;
}

export class ViewReport implements IViewReport {
	static readonly clean = Object.freeze( new ViewReport() );
    [key: string]      : any;
    _id                       = INIT_NUMBER_TYPES;
    fechaDeReporte     : Date = new Date();
    estado                    = '';
    comentariosReporte        = '';
    comentariosAdmin          = '';
    categoria                 = '';
    incidente                 = '';
    
    parse( obj: IBackendViewReport ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? ViewReport.clean[key] );
    		}
    		else if ( typeof this[key] === 'number' ){
    			this[key] = Number ( obj[key] ?? ViewReport.clean[key] );
    		}
    		else if ( typeof this[key] === 'boolean' ){
    			this[key] = Boolean ( obj[key] ?? ViewReport.clean[key] );
    		} else if ( DATE_PROPERTIES.indexOf( key ) ) {
    			this[key] = new Date( obj[key] ?? ViewReport.clean[key] );
    		}
    	} );
        
    	return this;
    }

    set( obj: IViewReport ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = ViewReport.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new ViewReport().set( this );
    }
}
