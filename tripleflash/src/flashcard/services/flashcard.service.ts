import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { parseJsonList } from '../constants/listUtilities';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class FlashCardService {
  fullList: Array<IFlashCardObject>;

  constructor(private request: RequestService) {
    // this.fullList = parseJsonList();
  }

  private mockGetCardSet(): Observable<Array<IFlashCardObject>> {
    return of(mockSet);
  }

  public getFlashCardSet(setKey: string, start?: number, finish?: number, online?: boolean): Observable<Array<IFlashCardObject>> {
    if (!online) {
      return of(parseJsonList(setKey)).pipe(
        map((set: Array<IFlashCardObject>) => {
          return this.sliceFlashCardSet(set, start, finish);
        })
      );
    } else {
      return this.request.getCards(setKey).pipe(map(res => {
        return this.sliceFlashCardSet(res.rows, start, finish);
      }));
    }
  }

  private sliceFlashCardSet(set: Array<IFlashCardObject>, start?: number, finish?: number) {
    let slicedSet = set;
    if ((start !== undefined && finish !== undefined && (start < finish))) {
      slicedSet = set.slice(start, finish + 1) //ad 1 to finish because slice extracts up to before the provide index
    }
    return slicedSet;
  }

}

const mockSet = [
    {kanji: 'soudan kanji', hiragana: 'soudan hiragana', english: 'consultation' },
    {kanji: 'tabemono kanji', hiragana: 'tabemono hiragana', english: 'food' },
    {kanji: 'mizu kanji', hiragana: 'mizu hiragana', english: 'water' },
    {kanji: '試験', hiragana: 'テスト', english: 'water' }
];