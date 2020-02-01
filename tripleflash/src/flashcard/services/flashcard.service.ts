import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { jsonList } from '../constants/jsonList';

@Injectable({
  providedIn: 'root',
})
export class FlashCardService {
  fullList: Array<TripleFlashCard>;

  constructor() {
    this.fullList = parseJsonList();
  }

  private mockGetCardSet(): Observable<Array<TripleFlashCard>> {
    return of(mockSet);
  }

  public getFlashCardSet(): Observable<Array<TripleFlashCard>> {
    // return this.mockGetCardSet();
    return of(this.fullList);
  }

}

export interface TripleFlashCard {
    kanji: string,
    hiragana: string,
    english: string
}

const mockSet = [
    {kanji: 'soudan kanji', hiragana: 'soudan hiragana', english: 'consultation' },
    {kanji: 'tabemono kanji', hiragana: 'tabemono hiragana', english: 'food' },
    {kanji: 'mizu kanji', hiragana: 'mizu hiragana', english: 'water' },
    {kanji: '試験', hiragana: 'テスト', english: 'water' }
];

function parseJsonList(): Array<TripleFlashCard> {
  const list: Array<Array<string>> = JSON.parse(jsonList);
  const parsedSet: Array<TripleFlashCard> = [];
  list.forEach((cardArray) => {
    if (cardArray.length == 2) {
      parsedSet.push({kanji: 'No Kanji Available', hiragana: cardArray[0], english: cardArray[1] });
    } else if (cardArray.length == 3) {
      parsedSet.push({kanji: cardArray[0], hiragana: cardArray[1], english: cardArray[2] });
    }
  });
  return parsedSet;
}