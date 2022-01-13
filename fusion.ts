import { randomBlockhash, randomETHAddress, seedGenerator } from "./random";

const amountOfFusion = [5, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2]
const formula = [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3]
const formulaString = ["Common", "Rare", "Epic", "Legendary"]
const luckyPotion = [10, 10, 10, 10, 10, 10, 10, 7, 7, 5, 5]
const successRateInit = [90, 80, 75, 70, 65, 60, 55, 50, 45, 35, 25]

const getFusionResult = (
    _user: string,
    _fusion_blockhash: string,
    _runeId: number,
    _lucky_potion: number[]
): boolean => {
    if (_runeId < 0 || _runeId > 10) throw new Error(`_runeId must be in range 0 and 10`)

    var lucky = _lucky_potion.length === 0 ? 0 : luckyPotion[_runeId]

    var seed = seedGenerator(_user, _fusion_blockhash, _runeId, amountOfFusion[_runeId], formula[_runeId], lucky)

    var prob = parseInt('0x' + seed, 16) % 1000

    if (prob < (successRateInit[_runeId] + lucky) * 10)
        return true
    else
        return false
}

// const rune = 0;
//const result = getFusionResult(randomETHAddress(), randomBlockhash(), rune, [])
var data = []

for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 1000; j++) {
        for (let k = 0; k < 2; k++) {
            var result = getFusionResult(randomETHAddress(), randomBlockhash(), i, k === 0 ? [] : [1])

            data.push({
                'rune': i,
                'fusion': amountOfFusion[i],
                'lucky': k,
                'result': result,
            })
        }
    }

}
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'result.csv',
    header: [
        { id: 'rune', title: 'rune' },
        { id: 'fusion', title: 'fusion' },
        { id: 'lucky', title: 'lucky' },
        { id: 'result', title: 'result' },
    ]
});

csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));    
