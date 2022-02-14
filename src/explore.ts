import * as Word from './Word'
import wordPoints from './dicts/wordPoints.json'

export type Answer = string
export type NextWords = string[]
export const findAnswerOrNextWords = (
    history: Word.WordleAnswerHistory,
    ans: Word.WordleAnswer,
): Answer | NextWords => {
    const results = wordPoints.filter(isHit(history, ans)) as [string, number][]
    if (results.length <= 0) {
        throw new Error('Not found')
    }
    if (results.length === 1) {
        return results[0][0]
    }
    return results.map((r) => r[0])
}

const isHit =
    (history: Word.WordleAnswerHistory, answer: Word.WordleAnswer) =>
    (poke: [string, number]): boolean => {
        return (
            [...history, answer]
                // 後でWordのIndexが必要になるため事前加工
                .map((ans) =>
                    ans.map((a, index) => ({ section: a, wordIndex: index })),
                )
                // Sectionの配列として展開
                .flatMap((a) => a)
                // すべてのSectionを検査し一致するか検証
                .every((chunk) => {
                    switch (chunk.section.hint) {
                        case Word.Hint.WrongWord:
                            return isExclude(poke[0], chunk.section.word)
                        case Word.Hint.CorrectWord:
                            return isInclude(
                                poke[0],
                                chunk.wordIndex,
                                chunk.section.word,
                            )
                        case Word.Hint.CorrectWordAndPlace:
                            return isCorrectPlace(
                                poke[0],
                                chunk.wordIndex,
                                chunk.section.word,
                            )
                    }
                })
        )
    }

const isCorrectPlace = (str: string, index: number, a: string) =>
    str.indexOf(a) === index
const isInclude = (str: string, index: number, a: string) =>
    str.indexOf(a) >= 0 && str.indexOf(a) !== index
const isExclude = (str: string, a: string) => str.indexOf(a) <= -1
