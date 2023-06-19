import { Injectable } from '@angular/core';
import { JapaneseAlphabet } from '../models/japanese-alphabet.model';
import hiragana from '../datasets/hiragana.dataset';
import katakana from '../datasets/katakana.dataset';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {

  getjapaneseLetters(alphabet: string, lettersToInclude: string[]): JapaneseAlphabet[] {
    var desiredAlphabet: JapaneseAlphabet[];

    if (alphabet === 'hiragana') {
      desiredAlphabet = hiragana;
    }
    else if (alphabet === 'katakana') {
      desiredAlphabet = katakana;
    }
    else { throw new Error('desiredAlphabet is not set') }
    
    return desiredAlphabet.filter(letter => lettersToInclude.includes(letter.type));
  }
  

}
