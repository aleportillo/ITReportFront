import { Incident } from "../incident.model";
import { categoria } from "../tools/tool-interface.model";

const INIT_NUMBER_TYPES  = 0;
const DATE_PROPERTIES = ['fechaDeActualzacion'];

export interface IBackendNewReport {
    [key: string]       : any;
    id                 : number;
    tipo                : string;
    idTipo              : number;
    incidente           : Incident;
    categoria           : categoria;
    fechaDeReporte      : Date;
    comentariosReporte  : string;
    computadoraId       : number;
    salaId              : number;
}

export interface INewReport {
    [key: string]       : any;
    id                 : number;
    tipo                : string;
    idTipo              : number;
    incidente           : string;
    categoria           : string;
    fechaDeReporte      : Date;
    comentariosReporte  : string;
}

export class NewReport implements INewReport {
	static readonly clean = Object.freeze( new NewReport() );
    [key: string]       : any;
    id                        = INIT_NUMBER_TYPES ;
    tipo                       = '';
    idTipo                     = INIT_NUMBER_TYPES ;
    incidente                  = '';
    categoria                  = '';
    fechaDeReporte : Date      = new Date();
    comentariosReporte         = '';

    parse( obj: IBackendNewReport ) {
        
    	Object.keys( this ).forEach( key  => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? NewReport.clean[key] );
    		}
    		else if ( typeof this[key] === 'number' ){
    			this[key] = Number ( obj[key] ?? NewReport.clean[key] );
    		}
    		else if ( DATE_PROPERTIES.indexOf( key ) ) {
    			this[key] = new Date( obj[key] ?? NewReport.clean[key] );
    		}
    	} );

        this.categoria = obj.categoria.nombre ?? '';
    	this.incidente = obj.incidente.nombre ?? '';
    	this.idTipo    = obj.salaId ?? obj.computadoraId;
    	this.tipo      = obj.salaId ? 'sala' : 'computadora';
        
    	return this;
    }

    set( obj: INewReport ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = NewReport.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new NewReport().set( this );
    }
}
