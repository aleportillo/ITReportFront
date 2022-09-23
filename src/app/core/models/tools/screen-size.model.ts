const INITIAL_VALUE = 0;

export interface IScreenSize {
    large  : boolean;
    medium : boolean;
    small  : boolean;
    size   : number;
}

export class ScreenSize implements IScreenSize {
	static readonly clean = Object.freeze( new ScreenSize() );
	large  = true; 
	medium = true; 
	small  = true;
	size   = INITIAL_VALUE;
}
