import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { User } from '../../../../app/services/service.user';


@Component({
	selector: 'header-cabinet',
  	templateUrl: './app/component/cabinet/cabinetHeader/cabinet.header.component.html',
	styleUrls: ['app/component/cabinet/cabinetHeader/cabinet.header.component.css', 'app/component/cabinet/cabinetHeader/cabinet.header.component.media.css']
})

export class componentCabinetHeader {
	constructor(private router:Router, private user:User){}
	
	logOut(){
		this.user.logOut().subscribe(res => {
			if(res.success){
				this.router.navigate(['']);
			}
		});
	}
}