import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { User } from '../../../../app/services/service.user';

@Component({
	selector: 'confirm-regist',
  	templateUrl: './app/component/auth/confirmRegist/confirm.regist.component.html',
	styleUrls: ['app/component/auth/confirmRegist/confirm.regist.component.css']
})

export class componentConfirmRegist implements OnInit{
	constructor(private router: Router, private user: User){
	}
	
	ngOnInit(){}

	onSubmit(registrEmailPass, statusConfRegistr){
		this.user.confirmRegist(registrEmailPass.value).subscribe(res => {
			if(res.ansServer){
				this.router.navigate(['registered']);
			}
			else {
				statusConfRegistr.innerHTML = "Неправельний код підтвердження! Ще раз скопіюйте код і вставте у поле вище.";
			}
		});
	}
	
}