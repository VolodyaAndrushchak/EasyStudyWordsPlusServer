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
var componentIndexHeader = (function () {
    function componentIndexHeader(router) {
        this.router = router;
    }
    componentIndexHeader.prototype.ngOnInit = function () {
    };
    componentIndexHeader.prototype.inCabinet = function () {
        this.router.navigate(['cabinet']);
    };
    componentIndexHeader.prototype.registr = function () {
        this.router.navigate(['registr']);
    };
    componentIndexHeader.prototype.login = function () {
        this.router.navigate(['login']);
    };
    componentIndexHeader = __decorate([
        core_1.Component({
            selector: 'header-index',
            templateUrl: './app/component/index/header/header.component.html',
            styleUrls: ['app/component/index/header/header.component.css', 'app/component/index/header/header.component.media.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], componentIndexHeader);
    return componentIndexHeader;
}());
exports.componentIndexHeader = componentIndexHeader;
//# sourceMappingURL=header.component.js.map