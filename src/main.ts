import { AnswerHistoryCache } from './AnswerHistoryCache'
import * as Prompt from './prompt'
import * as Explore from './explore'

const main = async () => {
    const cache = new AnswerHistoryCache()

    Prompt.putHelloMessage()

    for (;;) {
        const answer = await Prompt.readAnswer()
        const result = Explore.findAnswerOrNextWords(cache.get(), answer)

        if (typeof result === 'string') {
            Prompt.putAnswer(result)
            break
        }

        Prompt.putNextWords(result)
        cache.put(answer)
    }
}

main()
