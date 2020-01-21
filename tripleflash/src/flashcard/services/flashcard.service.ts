import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashCardService {

  constructor() { }

  private mockGetCardSet(): Observable<Array<TripleFlashCard>> {
    return of(mockSet);
  }

  public getFlashCardSet(): Observable<Array<TripleFlashCard>> {
    return this.mockGetCardSet();
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
    {kanji: 'mizu kanji', hiragana: 'mizu hiragana', english: 'water' }
];