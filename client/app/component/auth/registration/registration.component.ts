import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { User } from '../../../../app/services/service.user';

@Component({
	selector: 'registration',
  	templateUrl: './app/component/auth/registration/registration.component.html',
	styleUrls: ['app/component/auth/registration/registration.component.css'],
	providers: [User]
})

export class componentRegistration implements OnInit{
	
	constructor( private router:Router, private user: User){
  }
	
	ngOnInit(){}
	
	onSubmit(name, email, fpass, spass, statusPass){
		
		console.log(statusPass.innerHTML);
		if ( fpass.value != spass.value ){
			statusPass.innerHTML = "Неспівпадає комбінація паролів у полях!";
		}
		else {
			this.user.isThereEmail(name.value, fpass.value, email.value).subscribe(res => 
			{	
				if (res.ansServer) {
					this.router.navigate(['confreg']);
				}
				else {
					statusPass.innerHTML = "В сервісі є вже користувач з такою електронною адресою";
				}
			});				
		}
	}
}

