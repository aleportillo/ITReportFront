export interface SaveComputer {
    gabinete            : string;
    componentsHardware  : string[];
    componentesSoftware : string[];
    salaId              : string;
}

export interface IBackendComputer {
    [key: string]       : any;
    id                  : number;
    salaId              : number;
    gabinete            : string;
    components          : any[];
}

export interface IComputer {
    [key: string]       : any;
    id                  : number;
    salaId              : number;
    gabinete            : string;
    totalSoftware       ?: number;
    totalHardware       ?: number;
    hardware            : any[];
    software            : any[];
}

export class Computer implements IComputer {
	static readonly clean = Object.freeze( new Computer() );
    [key: string]      : any;
    id                 = 0 ;
    salaId             = 0;
    gabinete           = '';
    totalSoftware      ?= 0 ;
    totalHardware      ?= 0 ;
    hardware      : any = [];
    software      : any = [];
    
    parse( obj: IBackendComputer ) {
        
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
        
        
    	if ( obj.components.length ){
    		this.software =  obj.components.filter( ( item : any ) => item.categoriaId === 1 )
    			.map( ( item : any ) => { return { text: item.nombre, value: item.id }; } );
    		this.totalSoftware = this.software.length;
    		this.hardware =  obj.components.filter( ( item : any ) => item.categoriaId === 2 )
    			.map( ( item : any ) => { return { text: item.nombre, value: item.id }; } );
    		this.totalHardware = this.hardware.length;
    	}
        

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
