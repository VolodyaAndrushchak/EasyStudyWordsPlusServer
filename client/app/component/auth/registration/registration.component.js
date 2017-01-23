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
var router_1 = require('@angular/router');
var service_user_1 = require('../../../../app/services/service.user');
var componentRegistration = (function () {
    function componentRegistration(router, user) {
        this.router = router;
        this.user = user;
    }
    componentRegistration.prototype.ngOnInit = function () { };
    componentRegistration.prototype.onSubmit = function (name, email, fpass, spass, statusPass) {
        var _this = this;
        console.log(statusPass.innerHTML);
        if (fpass.value != spass.value) {
            statusPass.innerHTML = "Неспівпадає комбінація паролів у полях!";
        }
        else {
            this.user.isThereEmail(name.value, fpass.value, email.value).subscribe(function (res) {
                if (res.ansServer) {
                    _this.router.navigate(['confreg']);
                }
                else {
                    statusPass.innerHTML = "В сервісі є вже користувач з такою електронною адресою";
                }
            });
        }
    };
    componentRegistration = __decorate([
        core_1.Component({
            selector: 'registration',
            templateUrl: './app/component/auth/registration/registration.component.html',
            styleUrls: ['app/component/auth/registration/registration.component.css'],
            providers: [service_user_1.User]
        }), 
        __metadata('design:paramtypes', [router_1.Router, service_user_1.User])
    ], componentRegistration);
    return componentRegistration;
}());
exports.componentRegistration = componentRegistration;
//# sourceMappingURL=registration.component.js.map