import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { HiraganaLetter } from 'src/app/models/hiragana.model';
import { HiraganaService } from 'src/app/services/hiragana.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  hiraganaLetterSubject = new ReplaySubject<HiraganaLetter>();

  constructor(private hiraganaService: HiraganaService) { 
    this.nextLetter();
  }
  
  nextLetter() {
    this.hiraganaLetterSubject.next(this.hiraganaService.getRandomCharacter());
  }
}
