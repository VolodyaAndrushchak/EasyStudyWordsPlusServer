import { Component } from '@angular/core';
import { User } from './services/service.user';

@Component({
	 moduleId: module.id,
	 selector: 'my-app',
	 templateUrl: "app.component.html",
	 providers: [User]

})

export class AppComponent { 
}