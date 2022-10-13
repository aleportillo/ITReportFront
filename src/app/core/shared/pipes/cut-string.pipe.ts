import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
	name : 'cutString'
} )
export class CutStringPipe implements PipeTransform {

	transform( value: string ): string {
		if ( value.length > 100 ){
			return value.slice( 0, 100 ).trimEnd() + '...';
		} 
		return value;
	}

}
