import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { parseJsonList } from '../constants/listUtilities';
import { HttpClient } from '@angular/common/http';

const baseURL = 'https://triple-flash-backend.herokuapp.com/tripleflash';
const noneKeyword = 'NONE';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(private http: HttpClient) {
    // this.fullList = parseJsonList();
  }

  public getDecks(): Observable<Array<IDeck>> {
    return this.http.get(`${baseURL}/decks`) as Observable<Array<IDeck>>
  }

  public getCardsByDeck(deck: string): Observable<Array<IFlashCardObject>> {
    return this.http.get(`${baseURL}/cards/deck/${deck}`)as Observable<Array<IFlashCardObject>>
  }

  public getCardByKanji(kanji: string): Observable<Array<IFlashCardObject>> {
    return this.http.get(`${baseURL}/cards/kanji/${kanji}`)as Observable<Array<IFlashCardObject>>
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

  public getReviewCards() {
    return this.http.get(`${baseURL}/review/cards`)as Observable<Array<IFlashCardObject>>;
  }

  public updateCountForCard(kanji: string, hiragana: string, english: string, deck: string, newCount: number) {
    const body = {
      kanji: kanji,
      hiragana: hiragana,
      english: english,
      deck: deck,
      remaining: newCount
    }
    return this.http.put(`${baseURL}/review/cards`, body)
  }

  public addNewReviewCard(kanji: string, hiragana: string, english: string, deck: string, remaining: number, sampleSentence?: string, tag?: string) {
      const body = {
        kanji: kanji,
        hiragana: hiragana,
        english: english,
        deck: deck,
        sampleSentence: sampleSentence,
        tag: tag,
        remaining: remaining
      }
      return this.http.post(`${baseURL}/review/cards`, body)
  }
}