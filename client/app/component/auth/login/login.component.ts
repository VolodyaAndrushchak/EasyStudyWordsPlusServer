import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
	selector: 'login',
  	templateUrl: './app/component/auth/login/login.component.html',
	styleUrls: ['app/component/auth/login/login.component.css']
})

export class componentLogin implements OnInit{
	constructor(private router: Router){
		
	}
	
	ngOnInit(){}
	
	sendPass(){
		this.router.navigate(['sendpass']);
	}
}