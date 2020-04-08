
import { jsonList } from './jsonList';
import { n3VocabJSON } from './n3Vocab';
import { kanjiStep3JSON } from './kanjiStep3';
import { TripleFlashCard } from '../services/flashcard.service';
import { n2VocabJSON } from './n2Vocab';

export function parseJsonList(key: string = 'webN2'): Array<TripleFlashCard> {
    let chosenSetJSON: string;
    switch(key) {
        case 'webN2': {
            chosenSetJSON = jsonList;
            break;
        }
        case 'N2Vocab': {
            chosenSetJSON = n2VocabJSON;
            break;
        }
        case 'N3Vocab': {
            chosenSetJSON = n3VocabJSON;
            break;
        }
        case 'kanjiStep3': {
            chosenSetJSON = kanjiStep3JSON;
            break;
        }
        default: {
            chosenSetJSON = jsonList;
            break;
        }
    }
    const list: Array<Array<string>> = JSON.parse(chosenSetJSON);
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