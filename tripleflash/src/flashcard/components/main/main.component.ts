import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FlashCardService, TripleFlashCard } from 'src/flashcard/services/flashcard.service';

@Component({
  selector: 'tripleflash-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public flashCardSet: Array<TripleFlashCard> = [];
  public currentCard: TripleFlashCard = undefined;
  public completedSet: Array<TripleFlashCard> = [];
  public initialized: boolean = false;
  public finished: boolean = false;
  constructor (private flashCardService: FlashCardService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.flashCardService.getFlashCardSet().subscribe((cardSet: Array<TripleFlashCard>) => {
      this.flashCardSet = cardSet;
      this.accessNextCard();
      this.initialized = true;
    })
  }

  public goodButtonClicked() {
    this.completedSet.push(this.currentCard);
    this.currentCard = undefined;
    if (this.flashCardSet.length > 0) {
      this.accessNextCard();
    } else {
      this.finished = true;
    }
  }

  public redoButtonClicked() {
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