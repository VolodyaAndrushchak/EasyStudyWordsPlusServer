"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var home_component_1 = require('./component/index/homePage/home.component');
var header_component_1 = require('./component/index/header/header.component');
var footer_component_1 = require('./component/index/footer/footer.component');
var index_component_1 = require('./component/index/index.component');
var cabinet_component_1 = require('./component/cabinet/cabinet.component');
var cabinet_header_component_1 = require('./component/cabinet/cabinetHeader/cabinet.header.component');
var cabinet_home_component_1 = require('./component/cabinet/cabinetHome/cabinet.home.component');
var registration_component_1 = require('./component/auth/registration/registration.component');
var login_component_1 = require('./component/auth/login/login.component');
var forgotpassword_component_1 = require('./component/auth/forgotpassword/forgotpassword.component');
var confirm_regist_component_1 = require('./component/auth/confirmRegist/confirm.regist.component');
var routes = [
    { path: '', component: index_component_1.componentIndex },
    { path: 'cabinet', component: cabinet_component_1.componentCabinet },
    { path: 'registr', component: registration_component_1.componentRegistration },
    { path: 'login', component: login_component_1.componentLogin },
    { path: 'sendpass', component: forgotpassword_component_1.componentForgotPassword },
    { path: 'confreg', component: confirm_regist_component_1.componentConfirmRegist }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(routes)],
            declarations: [app_component_1.AppComponent,
                index_component_1.componentIndex,
                home_component_1.componentIndexHome,
                header_component_1.componentIndexHeader,
                footer_component_1.componentIndexFooter,
                cabinet_component_1.componentCabinet,
                cabinet_header_component_1.componentCabinetHeader,
                cabinet_home_component_1.componentCabinetHome,
                registration_component_1.componentRegistration,
                login_component_1.componentLogin,
                forgotpassword_component_1.componentForgotPassword,
                confirm_regist_component_1.componentConfirmRegist
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map