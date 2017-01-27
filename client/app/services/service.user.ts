import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class User {

	urlSite: string; 

	constructor(private http: Http) {}
	
	isThereEmail(nameUser, passUser, userMail){
		var locData = {
			nameUser: nameUser, 
			passUser: passUser, 
			emailUser: userMail
		};
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post("/isemail", JSON.stringify(locData), {headers: headers}).map(res => res.json());
		
	}
	
	confirmRegist(registrEmailPass){
		var locData = {
			pass: registrEmailPass
		};
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post("/confirmRegist", JSON.stringify(locData), {headers: headers}).map(res => res.json());
	}
	
	loginAction(userEmail, userPass, rememberme) {
		var locData = {
			useremail: userEmail,
			password: userPass,
			rememberme: rememberme
		};
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post("/login", JSON.stringify(locData), {headers: headers}).map(res => res.json());
	}
	
	isRegistered(){
		//var locUrl = "/cabinet";
		return this.http.get("/cabinet").map(res => res.json());
	}
	
	logOut(){
		//var locUrl = "/logout";
		return this.http.get("/logout").map(res => res.json());
	}
	
	getUserName(){
		return this.http.get("/cabinet/getUserName").map(res => res.json());
	}
	
	getPriorityCard(){
		return this.http.get("/cabinet/getPrCard").map(res => res.json());
	}
	
	getCatalogCards(){
		return this.http.get("/cabinet/getCatalog").map(res => res.json());
	}
	
	addCardToUserCards(card){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post("/cabinet/addCard", JSON.stringify({mustAddCard: card}), {headers: headers}).map(res => res.json());
	}
	
	delUserCard(card){
		return this.http.delete("/cabinet/deleteCard?delCard=" + card).map(res => res.json());
	}
	
	changePriorityCard(card){
		var locData = {
			card: card
		};
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.patch("/cabinet/chpriority", JSON.stringify(locData), {headers: headers}).map(res => res.json());
	}
}