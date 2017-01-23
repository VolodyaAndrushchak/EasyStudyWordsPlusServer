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
var componentConfirmRegist = (function () {
    function componentConfirmRegist(router, user) {
        this.router = router;
        this.user = user;
    }
    componentConfirmRegist.prototype.ngOnInit = function () { };
    componentConfirmRegist.prototype.onSubmit = function (registrEmailPass, statusConfRegistr) {
        var _this = this;
        this.user.confirmRegist(registrEmailPass.value).subscribe(function (res) {
            if (res.ansServer) {
                _this.router.navigate(['registered']);
            }
            else {
                statusConfRegistr.innerHTML = "Неправельний код підтвердження! Ще раз скопіюйте код і вставте у поле вище.";
            }
        });
    };
    componentConfirmRegist = __decorate([
        core_1.Component({
            selector: 'confirm-regist',
            templateUrl: './app/component/auth/confirmRegist/confirm.regist.component.html',
            styleUrls: ['app/component/auth/confirmRegist/confirm.regist.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, service_user_1.User])
    ], componentConfirmRegist);
    return componentConfirmRegist;
}());
exports.componentConfirmRegist = componentConfirmRegist;
//# sourceMappingURL=confirm.regist.component.js.map