import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable( {
	providedIn : 'root'
} )
export class InterceptorService implements HttpInterceptor{
	
	readonly _keys = {
		SESSION_TOKEN : 'IT_REPORT_TOKEN'
	};
 
	constructor() {}

	public intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

		const authorizedRequest = req.clone( {
			setHeaders : {
				Authorization : 'Bearer ' + localStorage.getItem( this._keys.SESSION_TOKEN )
			}
		} );

		return next.handle( authorizedRequest ).pipe( map( ( event: HttpEvent<any> ) => {
			return event;
		} ), catchError( ( err: any ) => throwError( err ) ) ) as Observable<HttpEvent<any>>;
	}
	
}
