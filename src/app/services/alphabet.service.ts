import { Injectable } from '@angular/core';
import hiragana, { HiraganaLetter } from '../models/hiragana.model';

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
