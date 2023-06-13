import { Injectable } from '@angular/core';
import hiragana, { HiraganaLetter } from 'src/app/models/hiragana.model';

@Injectable({
  providedIn: 'root'
})
export class HiraganaService {

  constructor() { }

  getRandomCharacter(): HiraganaLetter {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    return hiragana[randomIndex];
  }
}