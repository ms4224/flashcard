import { Component, OnInit } from '@angular/core';
import { FlashCardService, TripleFlashCard } from 'src/flashcard/services/flashcard.service';

@Component({
  selector: 'tripleflash-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  placeholder = 'tripleflash';
  public flashCardSet: Array<TripleFlashCard> = [];
  constructor (private flashCardService: FlashCardService) {
  }

  ngOnInit() {
    this.flashCardService.getFlashCardSet().subscribe((cardSet: Array<TripleFlashCard>) => {
      this.flashCardSet = cardSet;
    })
  }
}