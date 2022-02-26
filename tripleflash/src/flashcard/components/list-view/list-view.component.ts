import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RequestService } from 'src/flashcard/services/request.service';

@Component({
  selector: 'tripleflash-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  selectedDeck: string = '';
  decks: string[] = [];
  public loading: boolean;
  cards: IFlashCardObject[] = [];

  constructor(private request: RequestService) {
  }

  ngOnInit() {
    this.request.getDecks().subscribe(
      res => {
        console.log(res)
        res.forEach(row => {
          this.decks.push(row.deck);
        })
      }
    )
  }

  getCards() {
    this.cards = [];
    this.loading = true;
    this.request.getCards(this.selectedDeck).subscribe(
      res => {
        res.forEach(row => {
          this.cards.push(row);
        })
        this.loading = false;
      }
    )
  }
}