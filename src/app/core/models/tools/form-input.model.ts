
export interface IFormInputOption {
	text     : string;
	value    : any;
}

export interface IFormInputButton {
	label ?: string;
	type  ?: string;
	icon  ?: string;
}


export interface IFormInput {
	[key: string]      : any;
	name               : string;
	type               : string;
	subtype           ?: string;
	label             ?: string;
	disabled          ?: boolean;
	containerClasses  ?: string;
	inputClasses      ?: string;
	optional          ?: boolean;
	placeholder		  ?: string;
	options           ?: IFormInputOption[];
	allOptions        ?: any;
	columnSize        ?: number;
	maxLength         ?: number;
	minLength         ?: number;
	image             ?: string; 
}

export class FormInput implements IFormInput {
	static readonly clean = Object.freeze( new FormInput() );
	[key: string]     : any;
	name                    = '';
	type                    = '';
	subtype                ?= '';
	label                  ?= '';
	disabled               ?= false;
	containerClasses       ?= '';
	inputClasses           ?= '';
	optional               ?= false;
	placeholder		       ?= '';
	options                ?= [];
	allOptions             ?= [];
	columnSize              = 2;
	maxLength         		= 500;
	minLength         		= 8;
	image                  ?= '';

	parse( obj: IFormInput ) {

		Object.keys( this ).forEach( key  => {
			if ( typeof this[key] === 'string' ){
				this[key] = String ( obj[key] ?? FormInput.clean[key] );
			} else if ( typeof this[key] === 'boolean' ){
				this[key] = Boolean ( obj[key] ?? FormInput.clean[key] );
			} 
		} );

		return this;
	}

	set( obj: IFormInput ) {
		Object.entries( obj ).forEach( ( [key] ) => this[key] = obj[key] );

		return this;
	}

	clear() {
		Object.entries( this ).forEach( ( [key] ) => {
			this[key] = FormInput.clean[key];
		} );

		return this;
	}

	clone() {
		return new FormInput().set( this );
	}
}
