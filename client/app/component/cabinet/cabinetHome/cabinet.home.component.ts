import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { cardUser } from '../../../../app/component/cabinet/cabinetHome/classCard/classCard'
import { User } from '../../../../app/services/service.user';

@Component({
	selector: 'home-cabinet',
  	templateUrl: './app/component/cabinet/cabinetHome/cabinet.home.component.html',
	styleUrls: ['app/component/cabinet/cabinetHome/cabinet.home.component.css', 'app/component/cabinet/cabinetHome/cabinet.home.component.media.css']
})


export class componentCabinetHome implements OnInit{
	arrAddedCards: cardUser[];
	catalogCards: string[];
	addedPointerClick: number;
	catalogPointerClick: number;
	screenAddedCards: cardUser[];
	screenCatalog: string[];
	userName: string;
	genArrCard: cardUser[];
	
	@ViewChild('nameUser') nameUser: ElementRef; 
	@ViewChild('priorityCard') priority: ElementRef; 
	
	constructor(private user:User ){
		this.arrAddedCards = [];
		this.catalogCards = [];
		this.screenAddedCards = [];
		this.screenCatalog = [];
		this.addedPointerClick = 0;
		this.catalogPointerClick = 0;
		this.userName = "";
	}
	
	//private function for creating cards that will be shon on screen
	private createScreenCardsAdded(inputCards:any, pointer: number){
		var screenCards = [];
		for( let i  = pointer * 4; i < 4 + 4 * pointer; i++){
			if(inputCards[i]){
				screenCards.push(inputCards[i]);
			}
		}
		return screenCards;
	}
	
	ngOnInit(){
		
		//get user name
		this.user.getUserName().subscribe(res => {
			this.userName = res.nameUser;
			this.nameUser.nativeElement.innerHTML = this.userName;
		});
		
		this.user.getPriorityCard().subscribe(res => {
			this.priority.nativeElement.innerHTML = res.priorityCard;
		});
		
		//get added user's cards and catalogs cards
		this.user.getCatalogCards().subscribe(res => {
		
			this.catalogCards = res.catalog;
			this.arrAddedCards = res.addedCard;
			this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
			this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
		});
		
	}

	ngAfterViewInit(){
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
	
	addCardToUserCards(card: string, statusCard: any){
		this.user.addCardToUserCards(card).subscribe(res => {
			if(res.success){
				var newCard = new cardUser(card, null);
				this.arrAddedCards.push(newCard);
				if (this.catalogCards.indexOf(card) > -1) {
					this.catalogCards.splice(this.catalogCards.indexOf(card), 1);
				}
				
				this.addedPointerClick = 0;
				this.catalogPointerClick = 0;
				this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
				this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
				statusCard.innerHTML = "Ви успішно добавили картку слів.";
			}
			else {
				statusCard = "Виникла помилка при додаванні карти, спробуйте, будь ласка, ще раз."
			}
		});
	}
	
	//delete user cards
	deleteUserCard(card: string, statusCard: any){
		//service
		this.user.delUserCard(card).subscribe(res => {
			//OK
			if(res.success){
				//delete card from screen
				this.catalogCards.push(card);
				for(var i = 0; i < this.arrAddedCards.length; i++ ){
					if(this.arrAddedCards[i].usercard == card){
						this.arrAddedCards.splice(i, 1);
					}
				}
				//display
				this.addedPointerClick = 0;
				this.catalogPointerClick = 0;
				this.screenAddedCards = this.createScreenCardsAdded(this.arrAddedCards, this.addedPointerClick);
				this.screenCatalog = this.createScreenCardsAdded(this.catalogCards, this.catalogPointerClick);
				
				statusCard.innerHTML = "Ви успішно видалили картку слів.";
			}
			//no ok
			else {
				statusCard.innerHTML = "Виникла помилка при видалені карти, спробуйте, будь ласка, ще раз.";
			}
		});
	}
	
	changeStatusCard(card: string, statusCard:any){
		//change priority card on server
		this.user.changePriorityCard(card).subscribe(res => {
			//ok
			if(res.success){
				
				for(var i = 0; i < this.arrAddedCards.length; i++ ){
					//change priority card on client side
					if(this.arrAddedCards[i].priority == "1")
						this.arrAddedCards[i].priority = null;
					else {
						if (this.arrAddedCards[i].usercard === card)
							this.arrAddedCards[i].priority = "1";
					}
				}
				this.priority.nativeElement.innerHTML = card;
				statusCard.innerHTML = "Ви успішно змінили пріорітетну карту.";
			}
			//no ok
			else{
				statusCard.innerHTML = "Виникла помилка при зміні пріорітетної картки, спробуйте, будь ласка, ще раз.";
			}
		});
	}
	
}