import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './core/services/auth/interceptor.service';


@NgModule( {
	declarations : [AppComponent],
	imports      : [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatSnackBarModule,
		HttpClientModule
	],
	exports   : [MatSnackBarModule],
	providers : [
		{
			provide  : HTTP_INTERCEPTORS,
			useClass : InterceptorService,
			multi    : true
		},
	],
	bootstrap : [AppComponent]
} )
export class AppModule { }
