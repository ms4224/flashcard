import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { parseJsonList } from '../constants/listUtilities';

@Injectable({
  providedIn: 'root',
})
export class FlashCardService {
  fullList: Array<TripleFlashCard>;

  constructor() {
    // this.fullList = parseJsonList();
  }

  private mockGetCardSet(): Observable<Array<TripleFlashCard>> {
    return of(mockSet);
  }

  public getFlashCardSet(setKey: string): Observable<Array<TripleFlashCard>> {
    return of(parseJsonList(setKey));
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