import { Injectable } from '@angular/core';
import { JapaneseAlphabet } from '../models/japanese-alphabet.model';
import hiragana from '../datasets/hiragana.dataset';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {
  japaneseLetters: JapaneseAlphabet[] = hiragana;

  constructor() { }

  getjapaneseLetters(lettersToInclude: string[]): JapaneseAlphabet[] {
    return this.japaneseLetters.filter(letter => lettersToInclude.includes(letter.type));
  }
  

}
