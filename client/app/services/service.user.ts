import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class User {

	urlSite: string; 

	constructor(private http: Http) {
		this.urlSite = 'localhost:8080';
	}
	
	
	isThereEmail(userMail){
		var locUrl = this.urlSite + "/isemail";
		return this.http.get(locUrl).map(res => res.json());
	}
/*
	getGuestToken(cliend_id, cliend_secret, client_credentials) {
		var locURL = this.urlSite + '/oauth/v2/token?client_id=' + cliend_id + '&client_secret=' + cliend_secret + '&grant_type=' + client_credentials;
		console.log(locURL);
		return this.http.get(locURL).map(res => {
			console.log(res.json());
		});
	}
*/
	

}