import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RequestService } from 'src/flashcard/services/request.service';

@Component({
  selector: 'tripleflash-new-deck',
  templateUrl: './new-deck.component.html',
  styleUrls: ['./new-deck.component.scss'],
})
export class NewDeckComponent implements OnInit {
  newDeck: string;
  loading: boolean;
  finishMsg: string;

  constructor(private request: RequestService) {
  }

  ngOnInit() {
  }

  insertNewDeck() {
    this.finishMsg = 'loading';
    this.loading = true;
    this.request.createNewDeck(this.newDeck).subscribe(
      res => {
        console.log('inserted new deck complete');
        this.finishMsg = 'Insertion Complete.'
      }
    )
  }
}