import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FlashCardService } from 'src/flashcard/services/flashcard.service';
import { RequestService } from 'src/flashcard/services/request.service';

@Component({
  selector: 'tripleflash-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public setKeys = ['webN2', 'N2Vocab', 'N3Vocab', 'kanjiStep3'];
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
        res.rows.forEach(row => {
          this.onlineDecks.push(row.deck);
        })
      }
    )
  }

  public runOnlineSet() {
    this.runButtonClicked = true;
    this.flashCardService.getFlashCardSet(this.selectedOnlineDeck, Number(this.startIndex), Number(this.finishIndex), true).subscribe((cardSet: Array<IFlashCardObject>) => {
      this.flashCardSet = cardSet;
      this.accessNextCard();
      this.initialized = true;
    })
  }

  public runSet() {
    this.runButtonClicked = true;
    this.flashCardService.getFlashCardSet(this.selectedValue, Number(this.startIndex), Number(this.finishIndex)).subscribe((cardSet: Array<IFlashCardObject>) => {
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