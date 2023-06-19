import { Injectable } from '@angular/core';
import hiragana, { JapaneseAlphabet } from 'src/app/models/japanese-alphabet.model';

@Injectable({
  providedIn: 'root'
})
export class HiraganaService {

  constructor() { }

  getRandomCharacter(): JapaneseAlphabet {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    return hiragana[randomIndex];
  }
}
