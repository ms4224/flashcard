import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { parseJsonList } from '../constants/listUtilities';
import { HttpClient } from '@angular/common/http';

const baseURL = 'https://triple-flash-backend.herokuapp.com/tripleflash/'

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(private http: HttpClient) {
    // this.fullList = parseJsonList();
  }

  public getDecks(): Observable<IQueryResponse<IDeck>> {
    return this.http.get(`${baseURL}/decks`) as Observable<IQueryResponse<IDeck>>
  }

  public getCards(deck: string): Observable<IQueryResponse<IFlashCardObject>> {
    return this.http.get(`${baseURL}/cards/${deck}`)as Observable<IQueryResponse<IFlashCardObject>>
  }

  public insertIntoDeck(kanji: string, hiragana: string, english: string, deck: string, sampleSentence?: string, tag?: string) {
      const body = {
        kanji: kanji,
        hiragana: hiragana,
        english: english,
        deck: deck,
        sampleSentence: sampleSentence,
        tag: tag
      }
      return this.http.post(`${baseURL}/cards`, body)
  }

  public createNewDeck(deck: string) {
      const body = {
          deck: deck
      }
      return this.http.post(`${baseURL}/decks`, body)
  }
}