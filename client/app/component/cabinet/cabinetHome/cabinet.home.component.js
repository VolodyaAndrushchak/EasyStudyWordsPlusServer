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
var classCard_1 = require('../../../../app/component/cabinet/cabinetHome/classCard/classCard');
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
        this.userName = "";
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
        //get user name
        this.user.getUserName().subscribe(function (res) {
            _this.userName = res.nameUser;
            _this.nameUser.nativeElement.innerHTML = _this.userName;
        });
        this.user.getPriorityCard().subscribe(function (res) {
            _this.priority.nativeElement.innerHTML = res.priorityCard;
        });
        //get added user's cards and catalogs cards
        this.user.getCatalogCards().subscribe(function (res) {
            _this.catalogCards = res.catalog;
            _this.arrAddedCards = res.addedCard;
            _this.screenAddedCards = _this.createScreenCardsAdded(_this.arrAddedCards, _this.addedPointerClick);
            _this.screenCatalog = _this.createScreenCardsAdded(_this.catalogCards, _this.catalogPointerClick);
        });
    };
    componentCabinetHome.prototype.ngAfterViewInit = function () {
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
    componentCabinetHome.prototype.addCardToUserCards = function (card, statusCard) {
        var _this = this;
        this.user.addCardToUserCards(card).subscribe(function (res) {
            if (res.success) {
                var newCard = new classCard_1.cardUser(card, null);
                _this.arrAddedCards.push(newCard);
                if (_this.catalogCards.indexOf(card) > -1) {
                    _this.catalogCards.splice(_this.catalogCards.indexOf(card), 1);
                }
                _this.addedPointerClick = 0;
                _this.catalogPointerClick = 0;
                _this.screenAddedCards = _this.createScreenCardsAdded(_this.arrAddedCards, _this.addedPointerClick);
                _this.screenCatalog = _this.createScreenCardsAdded(_this.catalogCards, _this.catalogPointerClick);
                statusCard.innerHTML = "Ви успішно добавили картку слів.";
            }
            else {
                statusCard = "Виникла помилка при додаванні карти, спробуйте, будь ласка, ще раз.";
            }
        });
    };
    //delete user cards
    componentCabinetHome.prototype.deleteUserCard = function (card, statusCard) {
        var _this = this;
        //service
        this.user.delUserCard(card).subscribe(function (res) {
            //OK
            if (res.success) {
                //delete card from screen
                _this.catalogCards.push(card);
                for (var i = 0; i < _this.arrAddedCards.length; i++) {
                    if (_this.arrAddedCards[i].usercard == card) {
                        _this.arrAddedCards.splice(i, 1);
                    }
                }
                //display
                _this.addedPointerClick = 0;
                _this.catalogPointerClick = 0;
                _this.screenAddedCards = _this.createScreenCardsAdded(_this.arrAddedCards, _this.addedPointerClick);
                _this.screenCatalog = _this.createScreenCardsAdded(_this.catalogCards, _this.catalogPointerClick);
                statusCard.innerHTML = "Ви успішно видалили картку слів.";
            }
            else {
                statusCard.innerHTML = "Виникла помилка при видалені карти, спробуйте, будь ласка, ще раз.";
            }
        });
    };
    componentCabinetHome.prototype.changeStatusCard = function (card, statusCard) {
        var _this = this;
        //change priority card on server
        this.user.changePriorityCard(card).subscribe(function (res) {
            //ok
            if (res.success) {
                for (var i = 0; i < _this.arrAddedCards.length; i++) {
                    //change priority card on client side
                    if (_this.arrAddedCards[i].priority == "1")
                        _this.arrAddedCards[i].priority = null;
                    else {
                        if (_this.arrAddedCards[i].usercard === card)
                            _this.arrAddedCards[i].priority = "1";
                    }
                }
                _this.priority.nativeElement.innerHTML = card;
                statusCard.innerHTML = "Ви успішно змінили пріорітетну карту.";
            }
            else {
                statusCard.innerHTML = "Виникла помилка при зміні пріорітетної картки, спробуйте, будь ласка, ще раз.";
            }
        });
    };
    __decorate([
        core_1.ViewChild('nameUser'), 
        __metadata('design:type', core_1.ElementRef)
    ], componentCabinetHome.prototype, "nameUser", void 0);
    __decorate([
        core_1.ViewChild('priorityCard'), 
        __metadata('design:type', core_1.ElementRef)
    ], componentCabinetHome.prototype, "priority", void 0);
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