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
var componentCabinetHeader = (function () {
    function componentCabinetHeader(router, user) {
        this.router = router;
        this.user = user;
    }
    componentCabinetHeader.prototype.logOut = function () {
        var _this = this;
        this.user.logOut().subscribe(function (res) {
            if (res.success) {
                _this.router.navigate(['']);
            }
        });
    };
    componentCabinetHeader = __decorate([
        core_1.Component({
            selector: 'header-cabinet',
            templateUrl: './app/component/cabinet/cabinetHeader/cabinet.header.component.html',
            styleUrls: ['app/component/cabinet/cabinetHeader/cabinet.header.component.css', 'app/component/cabinet/cabinetHeader/cabinet.header.component.media.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, service_user_1.User])
    ], componentCabinetHeader);
    return componentCabinetHeader;
}());
exports.componentCabinetHeader = componentCabinetHeader;
//# sourceMappingURL=cabinet.header.component.js.map