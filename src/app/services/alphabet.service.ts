import { Injectable } from '@angular/core';
import { HiraganaLetter } from '../models/japanese-alphabet.model';
import hiragana from '../datasets/hiragana.dataset';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {
  hiraganaLetters: HiraganaLetter[] = hiragana;

  constructor() { }

  getHiraganaLetters(lettersToInclude: string[]): HiraganaLetter[] {
    return this.hiraganaLetters.filter(letter => lettersToInclude.includes(letter.type));
  }
  

}
