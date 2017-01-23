import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { User } from '../../../../app/services/service.user';

@Component({
	selector: 'home-cabinet',
  	templateUrl: './app/component/cabinet/cabinetHome/cabinet.home.component.html',
	styleUrls: ['app/component/cabinet/cabinetHome/cabinet.home.component.css', 'app/component/cabinet/cabinetHome/cabinet.home.component.media.css']
})

export class componentCabinetHome implements OnInit{
	arrAddedCards: string[];
	catalogCards: string[];
	addedPointerClick: number;
	catalogPointerClick: number;
	screenAddedCards: string[];
	screenCatalog: string[];
	
	constructor(private user:User){
		this.arrAddedCards = [];
		this.catalogCards = [];
		this.screenAddedCards = [];
		this.screenCatalog = [];
		this.addedPointerClick = 0;
		this.catalogPointerClick = 0;
	}
	
	//private function for creating cards that will be shon on screen
	private createScreenCardsAdded(inputCards:string[], pointer: number){
		var screenCards = [];
		for( let i  = pointer * 4; i < 4 + 4 * pointer; i++){
			if(inputCards[i]){
				screenCards.push(inputCards[i]);
			}
		}
		return screenCards;
	}
	
	ngOnInit(){
		//get added user's cards and catalogs cards
		this.user.getCatalogCards().subscribe(res => {
			this.catalogCards = res.catalog;
			this.arrAddedCards = res.addedCard;

			this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
			this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
		});
	}
	
	
	//left click on added cards
	leftClickAdded(){
		if (this.addedPointerClick > 0 ){
				this.addedPointerClick--;
				this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
		}
	}
	
	//right click on added cards
	rightClickAdded(){
		if (this.addedPointerClick < this.arrAddedCards.length/4 - 1){
				this.addedPointerClick++;
				this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
		}
	}
	
	//left click on catalog cards
	leftClickCatalog(){
		if (this.catalogPointerClick > 0 ){
				this.catalogPointerClick--;
				this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
		}
	}
	
	//right click on catalog cards
	rightClickCatalog(){
		if (this.catalogPointerClick < this.catalogCards.length/4 - 1 ){
				this.catalogPointerClick++;
				this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
		}
	}
	
	addCardToUserCards(card: string, statusAddedCard: any){
		this.user.addCardToUserCards(card).subscribe(res => {
			if(res.success){
				
				this.arrAddedCards.push(card);
	
				if (this.catalogCards.indexOf(card) > -1) {
					this.catalogCards.splice(this.catalogCards.indexOf(card), 1);
				}
				
				this.addedPointerClick = 0;
				this.catalogPointerClick = 0;
				this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
				this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
				console.log(statusAddedCard);
				statusAddedCard.innerHTML = "Ви успішно добавили картку слів.";
				console.log(statusAddedCard);
			}
			else {
				statusAddedCard = "Виникла помилка при додаванні карти, спробуйте, будь ласка, ще раз."
			}
			console.log(res);
		});
	}
	
}