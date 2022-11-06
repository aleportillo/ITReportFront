export interface SaveComputer {
    gabinete            : string;
    hardware            : string[];
    software            : string[];
    salaId              : string;
}

export interface IBackendComputer {
    id                  : number;
    salaId              : number;
    gabinete            : string;
    hardware            : string[];
    software            : string[];
}

export interface IComputer {
    [key: string]       : any;
    id                  : number;
    salaId              : number;
    gabinete            : string;
    totalSoftware       ?: number;
    totalHardware       ?: number;
    hardware            : string[];
    software            : string[];
}

export class Computer implements IComputer {
	static readonly clean = Object.freeze( new Computer() );
    [key: string]      : any;
    id                 = 0 ;
    salaId             = 0;
    gabinete           = '';
    totalSoftware      ?= 0 ;
    totalHardware      ?= 0 ;
    hardware           = [];
    software           = [];
    
    parse( obj: IComputer ) {
        
    	Object.keys( this ).forEach( key => {
    		if ( typeof this[key] === 'string' ){
    			this[key] = String ( obj[key] ?? Computer.clean[key] );
    		}
    		else if ( typeof this[key] === 'number' ){
    			this[key] = Number ( obj[key] ?? Computer.clean[key] );
    		}
    		else if ( typeof this[key] === 'boolean' ){
    			this[key] = Boolean ( obj[key] ?? Computer.clean[key] );
    		}
    		else {
    			this[key] =  ( obj[key] ?? Computer.clean[key] );
    		}
    	} );
        
    	this.totalHardware = this.hardware.length;
    	this.totalSoftware = this.software.length;

    	return this;
    }

    set( obj: IComputer ) {
    	Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );
    	return this;
    }

    clear() {
    	Object.entries( this ).forEach( ( [key] ) => {
    		this[key] = Computer.clean[key];
    	} );
    	return this;
    }

    clone() {
    	return new Computer().set( this );
    }
}
