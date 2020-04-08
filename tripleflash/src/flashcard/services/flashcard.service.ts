import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

  public getFlashCardSet(setKey: string, start?: number, finish?: number): Observable<Array<TripleFlashCard>> {
    return of(parseJsonList(setKey)).pipe(
      map((set: Array<TripleFlashCard>) => {
        let slicedSet = set;
        if ((start !== undefined && finish !== undefined && (start < finish))) {
          slicedSet = set.slice(start, finish + 1) //ad 1 to finish because slice extracts up to before the provide index
        }
        return slicedSet;
      })
    );
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