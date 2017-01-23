import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
	selector: 'success-registr',
  	templateUrl: './app/component/auth/successRegistr/success.registr.component.html',
	styleUrls: ['app/component/auth/successRegistr/success.registr.component.css']
})

export class componentSuccessRegistr implements OnInit{
	
	constructor( private router:Router){
  }
	
	ngOnInit(){}
}

