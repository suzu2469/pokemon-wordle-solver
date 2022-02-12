export type Kana = string

export enum Hint {
    WrongWord,
    CorrectWord,
    CorrectWordAndPlace,
}

export type Section = {
    word: Kana
    hint: Hint
}

export const sectionFrom = (word: Kana, hint: Hint): Section => {
    return {
        word,
        hint,
    }
}

export type WordleAnswer = [Section, Section, Section, Section, Section]

export const wordleAnswerFrom = (
    a: Section,
    b: Section,
    c: Section,
    d: Section,
    e: Section,
): WordleAnswer => {
    return [a, b, c, d, e]
}

export type WordleAnswerHistory = WordleAnswer[]
