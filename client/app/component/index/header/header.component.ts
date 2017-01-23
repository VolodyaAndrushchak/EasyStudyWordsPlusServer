import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { User } from '../../../../app/services/service.user';


@Component({
	selector: 'header-index',
  	templateUrl: './app/component/index/header/header.component.html',
	styleUrls: ['app/component/index/header/header.component.css', 'app/component/index/header/header.component.media.css']
})

export class componentIndexHeader implements OnInit {
	constructor(private router: Router, private user: User){
		
	}
	
	ngOnInit() {
	}
	
	inCabinet() {
		this.user.isRegistered().subscribe(res => {
			if(res.success){
				this.router.navigate(['cabinet']);
			}
			else {
				this.router.navigate(['login']);
			}
		});
		
	}
	
	registr() {
		this.router.navigate(['registr']);
	}
	
	login() {
		this.router.navigate(['login']);
	}
}