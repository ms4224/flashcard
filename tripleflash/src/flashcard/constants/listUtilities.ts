
import { jsonList } from './jsonList';
import { TripleFlashCard } from '../services/flashcard.service';

export function parseJsonList(): Array<TripleFlashCard> {
    const list: Array<Array<string>> = JSON.parse(jsonList);
    const parsedSet: Array<TripleFlashCard> = [];
    list.forEach((cardArray) => {
        if (cardArray.length == 2) {
            parsedSet.push({ kanji: 'No Kanji Available', hiragana: cardArray[0], english: cardArray[1] });
        } else if (cardArray.length == 3) {
            parsedSet.push({ kanji: cardArray[0], hiragana: cardArray[1], english: cardArray[2] });
        }
    });
    return parsedSet;
}