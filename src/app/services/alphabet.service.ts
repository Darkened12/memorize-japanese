import { Injectable } from '@angular/core';
import { JapaneseAlphabet } from '../models/japanese-alphabet.model';
import hiragana from '../datasets/hiragana.dataset';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {
  hiraganaLetters: JapaneseAlphabet[] = hiragana;

  constructor() { }

  getHiraganaLetters(lettersToInclude: string[]): JapaneseAlphabet[] {
    return this.hiraganaLetters.filter(letter => lettersToInclude.includes(letter.type));
  }
  

}
