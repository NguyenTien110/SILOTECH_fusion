import { randomBlockhash, randomETHAddress, seedGenerator } from "./random";

const amountOfFusion = [5, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2]
const formula = [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3]
const formulaString = ["Common", "Rare", "Epic", "Legendary"]
const luckyPotion = [7, 7, 7, 7, 7, 5, 5, 3, 3, 1, 1]
const successRateInit = [80, 60, 40, 30, 25, 15, 15, 5, 3, 1, 0.5]

const getFusionResult = (_user: string, _buy_blockhash: string, _runeId: number, _lucky_potion: boolean): string => {
    if (_runeId < 0 || _runeId > 10) throw new Error(`_runeId must be in range 0 and 10`)

    var lucky = _lucky_potion === true ? luckyPotion[_runeId] : 0

    var seed = seedGenerator(_user, _buy_blockhash, _runeId, amountOfFusion[_runeId], formula[_runeId], lucky)

    var prob = parseInt('0x' + seed, 16) % 1000
    
    if (prob < (successRateInit[_runeId] + lucky) * 10) 
        return "success"
    else 
        return "fail"
}

const rune = 0;
const result = getFusionResult(randomETHAddress(), randomBlockhash(), rune, true)

console.log(result);
