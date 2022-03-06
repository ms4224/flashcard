import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/flashcard/services/request.service';

@Component({
  selector: 'kanji-match',
  templateUrl: './kanji-match.component.html',
  styleUrls: ['./kanji-match.component.scss']
})
export class KanjiMatchComponent implements OnInit {

  @Input() kanji: string;
  cards: IFlashCardObject[];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.kanji) {
      this.updateMatchList();
    }
  }

  updateMatchList() {
    console.log('requesting card by kanji', this.kanji)
    this.requestService.getCardByKanji(this.kanji).subscribe(
      {
        next: (cards) => {
          this.cards = cards;
        },
        error: err => {
          console.log('there was an error', err)
        }
      }
    )
  }

  sendToReview(card: IFlashCardObject) {
    this.requestService.addNewReviewCard(card.kanji, card.hiragana, card.english, card.deck, 3, card.sampleSentence, card.english).subscribe(
      {
        next: () => console.log('added to review successfully', card.kanji),
        error: (err) => console.log('error adding this card to revie: ', card.kanji, err)
      }
    )
  }

}
