import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
	selector: 'header-index',
  	templateUrl: './app/component/index/header/header.component.html',
	styleUrls: ['app/component/index/header/header.component.css', 'app/component/index/header/header.component.media.css']
})

export class componentIndexHeader implements OnInit {
	constructor(private router: Router){
		
	}
	
	ngOnInit() {
	}
	
	inCabinet() {
		this.router.navigate(['cabinet']);
	}
	
	registr() {
		this.router.navigate(['registr']);
	}
	
	login() {
		this.router.navigate(['login']);
	}
}