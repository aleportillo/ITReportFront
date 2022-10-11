import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
	name : 'inputErrors'
} )
export class InputErrorsPipe implements PipeTransform {

	transform( value: any ): string {
		// console.log(value);
	
		if ( value?.minlength ){
			return `Mínimo ${ value?.minlength?.requiredLength } caracteres`;
		}
	
		return '';
	}

}
