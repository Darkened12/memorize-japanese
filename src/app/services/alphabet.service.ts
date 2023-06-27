import { Injectable } from '@angular/core';
import { JapaneseLetter, WeightedJapaneseLetter } from '../models/japanese-alphabet.model';
import hiragana from '../datasets/hiragana.dataset';
import katakana from '../datasets/katakana.dataset';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {
  private _WeightedHiraganaAlphabet: WeightedJapaneseLetter[];
  private _WeightedKatakanaAlphabet: WeightedJapaneseLetter[];

  constructor() {
    this._WeightedHiraganaAlphabet = this._generateWeightedAlphabet(hiragana);
    this._WeightedKatakanaAlphabet = this._generateWeightedAlphabet(katakana);
  }

  private _generateWeightedAlphabet(alphabet: JapaneseLetter[]): WeightedJapaneseLetter[] {
    return alphabet.map(japaneseLetter => {
      return {
        ...japaneseLetter,
        weight: 0
      } as WeightedJapaneseLetter;
    });
  }

  private _getAlphabet(alphabetName: string): WeightedJapaneseLetter[] {
    if (alphabetName === 'hiragana') {
      return this._WeightedHiraganaAlphabet;
    }
    if (alphabetName === 'katakana') {
      return this._WeightedKatakanaAlphabet;
    }
    
    throw new Error('desiredAlphabet is not set')
  }
  

  getWeightedAlphabet(alphabet: string, lettersToInclude: string[]): WeightedJapaneseLetter[] {
    const desiredAlphabet = this._getAlphabet(alphabet);
    return desiredAlphabet.filter(letter => lettersToInclude.includes(letter.type));
  }

}
