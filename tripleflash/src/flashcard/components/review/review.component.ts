import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FlashCardService } from 'src/flashcard/services/flashcard.service';
import { RequestService } from 'src/flashcard/services/request.service';

@Component({
  selector: 'tripleflash-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  public setKeys = ['webN2', 'N2Vocab', 'N3Vocab', 'kanjiStep3', 'kanjiStep2', 'kanji2KyuuStep3'];
  public selectedValue = '';
  public flashCardSet: Array<IFlashCardObject> = [];
  public currentCard: IFlashCardObject = undefined;
  public completedSet: Array<IFlashCardObject> = [];
  public initialized: boolean = false;
  public finished: boolean = false;
  public runButtonClicked: boolean = false;
  public startIndex: number = undefined;
  public finishIndex: number = undefined;
  public selectedOnlineDeck: string;
  public onlineDecks: string[] = [];
  constructor (private flashCardService: FlashCardService, private changeDetectorRef: ChangeDetectorRef, private request: RequestService) {
  }

  

  ngOnInit() {
    this.request.getDecks().subscribe(
      res => {
        res.forEach(row => {
          this.onlineDecks.push(row.deck);
        })
      }
    )
  }

  public runReviewSet() {
    this.runButtonClicked = true;
    this.flashCardService.getReviewSet(Number(this.startIndex), Number(this.finishIndex)).subscribe((cardSet: Array<IFlashCardObject>) => {
      this.flashCardSet = cardSet;
      this.accessNextCard();
      this.initialized = true;
    })
  }


  public goodButtonClicked() {
    const prevCard = this.currentCard;
    this.request.updateCountForCard(prevCard.kanji, prevCard.hiragana, prevCard.english, prevCard.deck,
      prevCard.remaining > 0 ? prevCard.remaining - 1 : prevCard.remaining)
      .subscribe(
        {
          next: res => console.log('success reduced the count for', prevCard),
          error: err => console.log('err reducing count', err)
        }
      )
    this.completedSet.push(this.currentCard);
    this.currentCard = undefined;
    if (this.flashCardSet.length > 0) {
      this.accessNextCard();
    } else {
      this.finished = true;
    }
  }

  public redoButtonClicked() {
    const prevCard = this.currentCard;
    prevCard.remaining = 3;
    this.request.updateCountForCard(prevCard.kanji, prevCard.hiragana, prevCard.english, prevCard.deck,
      prevCard.remaining)
      .subscribe(
        {
          next: res => console.log('success reset the count for', prevCard),
          error: err => console.log('err reset count', err)
        }
      )
    this.flashCardSet.push(this.currentCard);
    this.currentCard = undefined;
    this.accessNextCard();
  }

  public accessNextCard() {
    this.changeDetectorRef.detectChanges(); // to reset the card component flips
    if (this.flashCardSet.length > 0) {
      // this.currentCard = this.flashCardSet.shift(); //non-random order algorithm for choosing next card
      this.currentCard = this.flashCardSet.splice(Math.floor(Math.random() * this.flashCardSet.length), 1)[0];
    }
  }

}
