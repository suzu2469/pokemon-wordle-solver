import { WordleAnswer, WordleAnswerHistory } from './Word'

export class AnswerHistoryCache {
    private history: WordleAnswerHistory = []

    get(): WordleAnswerHistory {
        return this.history
    }

    put(answer: WordleAnswer): void {
        this.history.push(answer)
    }
}
