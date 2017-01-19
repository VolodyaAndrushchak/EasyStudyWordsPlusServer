import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }  from '@angular/forms';

import { componentIndexHome } from './component/index/homePage/home.component';
import { componentIndexHeader } from './component/index/header/header.component';
import { componentIndexFooter } from './component/index/footer/footer.component';
import { componentIndex } from './component/index/index.component';
import { componentCabinet } from './component/cabinet/cabinet.component';
import { componentCabinetHeader } from './component/cabinet/cabinetHeader/cabinet.header.component';
import { componentCabinetHome } from './component/cabinet/cabinetHome/cabinet.home.component';
import { componentRegistration } from './component/auth/registration/registration.component';
import { componentLogin } from './component/auth/login/login.component';
import { componentForgotPassword } from './component/auth/forgotpassword/forgotpassword.component';
import { componentConfirmRegist } from './component/auth/confirmRegist/confirm.regist.component';

 const routes: Routes   = [
	{ path: '', component: componentIndex},
	{ path: 'cabinet', component: componentCabinet},
	{ path: 'registr', component: componentRegistration},
	{ path: 'login', component: componentLogin},
	{ path: 'sendpass', component: componentForgotPassword},
	{ path: 'confreg', component: componentConfirmRegist}
];

@NgModule({
  imports:      [ FormsModule, BrowserModule, HttpModule, RouterModule.forRoot(routes) ],
  declarations: [AppComponent, 
				 componentIndex,
				 componentIndexHome, 
				 componentIndexHeader, 
				 componentIndexFooter,
				 componentCabinet,
				 componentCabinetHeader,
				 componentCabinetHome,
				 componentRegistration,
				 componentLogin,
				 componentForgotPassword,
				 componentConfirmRegist
				],
	
  bootstrap: [AppComponent]

})
export class AppModule { }