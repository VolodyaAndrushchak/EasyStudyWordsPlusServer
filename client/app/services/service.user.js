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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var User = (function () {
    function User(http) {
        this.http = http;
    }
    User.prototype.isThereEmail = function (nameUser, passUser, userMail) {
        //var locUrl = "/isemail";
        var locData = {
            nameUser: nameUser,
            passUser: passUser,
            emailUser: userMail
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/isemail", JSON.stringify(locData), { headers: headers }).map(function (res) { return res.json(); });
    };
    User.prototype.confirmRegist = function (registrEmailPass) {
        //var locUrl = "/confirmRegist";
        var locData = {
            pass: registrEmailPass
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/confirmRegist", JSON.stringify(locData), { headers: headers }).map(function (res) { return res.json(); });
    };
    User.prototype.loginAction = function (userEmail, userPass, rememberme) {
        //var locUrl = "/login";
        var locData = {
            useremail: userEmail,
            password: userPass,
            rememberme: rememberme
        };
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/login", JSON.stringify(locData), { headers: headers }).map(function (res) { return res.json(); });
    };
    User.prototype.isRegistered = function () {
        //var locUrl = "/cabinet";
        return this.http.get("/cabinet").map(function (res) { return res.json(); });
    };
    User.prototype.logOut = function () {
        //var locUrl = "/logout";
        return this.http.get("/logout").map(function (res) { return res.json(); });
    };
    User.prototype.getCatalogCards = function () {
        //var locUrl = "/cabinet/getCatalog";
        return this.http.get("/cabinet/getCatalog").map(function (res) { return res.json(); });
    };
    User.prototype.addCardToUserCards = function (card) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/cabinet/addCard", JSON.stringify({ mustAddCard: card }), { headers: headers }).map(function (res) { return res.json(); });
    };
    User = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=service.user.js.map