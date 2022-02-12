import * as readline from 'readline'
import * as Word from './Word'

export const putHelloMessage = () => {
    console.log(
        `ポケモンWordleの答えを導きます \n 一番最初に入力するポケモンのおすすめは「グラードン」です　\n`,
    )
}

export const readAnswer = (): Promise<Word.WordleAnswer> => {
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise((resolve, reject) => {
        readlineInterface.question('何を入力しましたか？ > ', (answer) => {
            const strArr = answer.split('')
            if (strArr.length !== 5) {
                console.log('5文字で入力してください')
                return reject(`Not 5 words ${strArr}: length ${strArr.length}`)
            }

            resolve(strArr)
        })
    }).then((strArr: string[]) => {
        return new Promise((resolve, reject) => {
            readlineInterface.question(
                `結果はどうでしたか？ \n 0...灰色 1...オレンジ 2...緑色 \n 例 (00120) > `,
                (answer) => {
                    const ansArr = answer.split('')
                    if (ansArr.length !== 5) {
                        console.log('5文字で入力してください')
                        return reject('Not 5 answer')
                    }
                    const hints = ansArr.map(hintFromStr)

                    resolve(
                        Word.wordleAnswerFrom(
                            Word.sectionFrom(strArr[0], hints[0]),
                            Word.sectionFrom(strArr[1], hints[1]),
                            Word.sectionFrom(strArr[2], hints[2]),
                            Word.sectionFrom(strArr[3], hints[3]),
                            Word.sectionFrom(strArr[4], hints[4]),
                        ),
                    )
                    readlineInterface.close()
                },
            )
        })
    })
}

const hintFromStr = (ans: string): Word.Hint => {
    switch (ans) {
        case '0':
            return Word.Hint.WrongWord
        case '1':
            return Word.Hint.CorrectWord
        case '2':
            return Word.Hint.CorrectWordAndPlace
    }
}

export const putAnswer = (answer: string) => {
    console.log(`答えは「${answer}」です`)
}

const recentWordsLength = 5
export const putNextWords = (nextWords: string[]) => {
    if (nextWords.length >= recentWordsLength) {
        const recentWords = nextWords.filter((_, i) => i <= 5)
        console.log(
            `近い答えは ${recentWords.join(', ')} の他${
                nextWords.length - recentWords.length
            }件あります`,
        )
        return
    }

    console.log(`近い答えは ${nextWords.join(', ')} です`)
}
