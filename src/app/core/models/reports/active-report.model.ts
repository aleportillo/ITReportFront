import { Incident } from '../incident.model';
import { categoria, estado } from '../tools/tool-interface.model';

const INIT_NUMBER_TYPES  = 0;
const DATE_PROPERTIES = ['fechaDeActualizacion'];

export interface IBackendActiveReport {
    [key: string]       : any;
    id                 : number;
    tipo                : string;
    idTipo              : number;
    incidente           : Incident;
    categoria           : categoria;
    fechaActualizacion  : Date;
    estado              : estado;
    computadoraId       : number;
    salaId              : number;
    sala                : any;
    computadora         : any;
}

export interface IActiveReport {
    [key: string]       : any;
    id                  : number;
    tipo                : string;
    idTipo              : number;
    incidente           : string;
    categoria           : string;
    fechaActualizacion  : Date | null;
    estado              : string;
}

export class ActiveReport implements IActiveReport {
	static readonly clean = Object.freeze( new ActiveReport() );
    [key: string]       : any;
    id                         = INIT_NUMBER_TYPES ;
    tipo                       = '';
    idTipo                     = INIT_NUMBER_TYPES ;
    incidente                  = '';
    categoria                  = '';
    fechaActualizacion: Date | null  = null;
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
    			this[key] = obj[key] ? new Date( obj[key] ) : null;
    		}
    	} );

    	this.categoria = obj.categoria.nombre ?? '';
    	this.incidente = obj.incidente.nombre ?? '';
    	this.estado    = obj.estado.nombre ?? '';
    	this.idTipo    = obj.salaId ? obj.sala.nombre : obj.computadora.gabinete;
    	this.tipo      = obj.salaId ? 'sala' : 'computadora';
        
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
