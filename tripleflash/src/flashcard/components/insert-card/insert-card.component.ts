import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RequestService } from 'src/flashcard/services/request.service';

@Component({
  selector: 'tripleflash-insert-card',
  templateUrl: './insert-card.component.html',
  styleUrls: ['./insert-card.component.scss'],
})
export class InsertCardComponent implements OnInit {
  decks: string[] = [];
  public loading: boolean;
  selectedDeck: string = '';
  kanji: string = '';
  hiragana: string = '';
  english: string = '';
  sampleSentence: string = '';
  tag: string = '';
  completeMsg: string = '';
  constructor(private request: RequestService) {
  }

  ngOnInit() {
    this.request.getDecks().subscribe(
      res => {
        console.log(res, 'yolo');
        res.rows.forEach(row => {
          this.decks.push(row.deck);
          console.log(this.decks);
        })
      }
    )
  }

  public insertCard() {
    this.completeMsg = 'loading';
    this.request.insertIntoDeck(this.kanji, this.hiragana, this.english, this.selectedDeck, this.sampleSentence, this.tag).subscribe(
      (res) => {
        this.completeMsg = 'Finished update';
      }
    )
  }

  public clearBaseInputs() {
    this.kanji = '';
    this.hiragana = '';
    this.english = '';
  }
}