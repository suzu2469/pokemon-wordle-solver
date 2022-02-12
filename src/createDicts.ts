import pokemons from '../pokemon_data.json'
import katakana from '../katakana.json'

import * as fs from 'fs'
import * as path from 'path'

const wordlePokemons = pokemons.filter(
    (poke) => poke.name.length === 5 && poke.no <= 494,
)

const words: [string, number][] = katakana
    .map<[string, number]>((word) => [
        word,
        wordlePokemons.reduce(
            (p, c) => (c.name.indexOf(word) >= 0 ? p + 1 : p),
            0,
        ),
    ])
    .sort((a, b) => (a[1] > b[1] ? -1 : 1))

const wordsPoints = wordlePokemons
    .map((poke) => [
        poke.name,
        words.reduce(
            (p, c) => (poke.name.indexOf(c[0]) >= 0 ? p + c[1] : p),
            0,
        ),
    ])
    .sort((a, b) => (a[1] > b[1] ? -1 : 1))

fs.writeFileSync(
    path.resolve(__dirname, './dicts/words.json'),
    JSON.stringify(words),
)
fs.writeFileSync(
    path.resolve(__dirname, './dicts/wordPoints.json'),
    JSON.stringify(wordsPoints),
)
