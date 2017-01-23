import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { User } from '../../../../app/services/service.user';

@Component({
	selector: 'login',
  	templateUrl: './app/component/auth/login/login.component.html',
	styleUrls: ['app/component/auth/login/login.component.css']
})

export class componentLogin implements OnInit{
	constructor(private router: Router, private user: User){
		
	}
	
	ngOnInit(){}
	
	sendPass(){
		this.router.navigate(['sendpass']);
	}
	
	onSubmit(userEmail, userPass, rememberMe, statusLogin){
		console.log(rememberMe.checked);
		this.user.loginAction(userEmail.value, userPass.value, rememberMe.checked).subscribe(res => {
			if (res.success){
				this.router.navigate(['cabinet']);
			}
			else {
				statusLogin.innerHTML = "Неправильний логін чи пароль!"
			}
			
		});
	}
}
