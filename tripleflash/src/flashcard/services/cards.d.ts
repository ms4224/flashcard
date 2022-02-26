

type IDeck = {
    deck: string;
}

type IFlashCardObject = {
    kanji: string,
    hiragana: string,
    english: string,
    deck?: string,
    sampleSentence?: string,
    tag?: string,
    remaining?: number
}