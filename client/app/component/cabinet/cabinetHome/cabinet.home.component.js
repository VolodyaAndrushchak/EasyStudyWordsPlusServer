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
var service_user_1 = require('../../../../app/services/service.user');
var componentCabinetHome = (function () {
    function componentCabinetHome(user) {
        this.user = user;
        this.arrAddedCards = [];
        this.catalogCards = [];
        this.screenAddedCards = [];
        this.screenCatalog = [];
        this.addedPointerClick = 0;
        this.catalogPointerClick = 0;
    }
    //private function for creating cards that will be shon on screen
    componentCabinetHome.prototype.createScreenCardsAdded = function (inputCards, pointer) {
        var screenCards = [];
        for (var i = pointer * 4; i < 4 + 4 * pointer; i++) {
            if (inputCards[i]) {
                screenCards.push(inputCards[i]);
            }
        }
        return screenCards;
    };
    componentCabinetHome.prototype.ngOnInit = function () {
        var _this = this;
        //get added user's cards and catalogs cards
        this.user.getCatalogCards().subscribe(function (res) {
            _this.catalogCards = res.catalog;
            _this.arrAddedCards = res.addedCard;
            _this.screenAddedCards = _this.createScreenCardsAdded(_this.arrAddedCards, _this.addedPointerClick);
            _this.screenCatalog = _this.createScreenCardsAdded(_this.catalogCards, _this.catalogPointerClick);
        });
    };
    //left click on added cards
    componentCabinetHome.prototype.leftClickAdded = function () {
        if (this.addedPointerClick > 0) {
            this.addedPointerClick--;
            this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
        }
    };
    //right click on added cards
    componentCabinetHome.prototype.rightClickAdded = function () {
        if (this.addedPointerClick < this.arrAddedCards.length / 4 - 1) {
            this.addedPointerClick++;
            this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
        }
    };
    //left click on catalog cards
    componentCabinetHome.prototype.leftClickCatalog = function () {
        if (this.catalogPointerClick > 0) {
            this.catalogPointerClick--;
            this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
        }
    };
    //right click on catalog cards
    componentCabinetHome.prototype.rightClickCatalog = function () {
        if (this.catalogPointerClick < this.catalogCards.length / 4 - 1) {
            this.catalogPointerClick++;
            this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
        }
    };
    componentCabinetHome.prototype.addCardToUserCards = function (card, statusAddedCard) {
        var _this = this;
        this.user.addCardToUserCards(card).subscribe(function (res) {
            if (res.success) {
                _this.arrAddedCards.push(card);
                if (_this.catalogCards.indexOf(card) > -1) {
                    _this.catalogCards.splice(_this.catalogCards.indexOf(card), 1);
                }
                _this.addedPointerClick = 0;
                _this.catalogPointerClick = 0;
                _this.screenAddedCards = _this.createScreenCardsAdded(_this.arrAddedCards, _this.addedPointerClick);
                _this.screenCatalog = _this.createScreenCardsAdded(_this.catalogCards, _this.catalogPointerClick);
                console.log(statusAddedCard);
                statusAddedCard.innerHTML = "Ви успішно добавили картку слів.";
                console.log(statusAddedCard);
            }
            else {
                statusAddedCard = "Виникла помилка при додаванні карти, спробуйте, будь ласка, ще раз.";
            }
            console.log(res);
        });
    };
    componentCabinetHome = __decorate([
        core_1.Component({
            selector: 'home-cabinet',
            templateUrl: './app/component/cabinet/cabinetHome/cabinet.home.component.html',
            styleUrls: ['app/component/cabinet/cabinetHome/cabinet.home.component.css', 'app/component/cabinet/cabinetHome/cabinet.home.component.media.css']
        }), 
        __metadata('design:paramtypes', [service_user_1.User])
    ], componentCabinetHome);
    return componentCabinetHome;
}());
exports.componentCabinetHome = componentCabinetHome;
//# sourceMappingURL=cabinet.home.component.js.map