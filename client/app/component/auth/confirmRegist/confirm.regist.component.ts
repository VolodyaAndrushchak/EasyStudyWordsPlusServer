import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
	selector: 'confirm-regist',
  	templateUrl: './app/component/auth/confirmRegist/confirm.regist.component.html',
	styleUrls: ['app/component/auth/confirmRegist/confirm.regist.component.css']
})

export class componentConfirmRegist implements OnInit{
	constructor(private router: Router){
	}
	
	ngOnInit(){}

}