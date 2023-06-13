import { Component } from '@angular/core';
import { Subject, ReplaySubject, take } from 'rxjs';
import { HiraganaLetter } from 'src/app/models/hiragana.model';
import { HiraganaService } from 'src/app/services/hiragana.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  hiraganaLetterSubject = new ReplaySubject<HiraganaLetter>(1);
  successfulMatchSubject = new Subject<boolean>();

  constructor(private hiraganaService: HiraganaService) { 
    this.nextLetter();
  }

  onInputUpdate(event: string) {
    this.hiraganaLetterSubject.pipe(take(1)).subscribe(letter => {
      this.successfulMatchSubject.next(event.toLowerCase() == letter.romanji)
    });
    this.nextLetter();
  }
  
  nextLetter() {
    this.hiraganaLetterSubject.next(this.hiraganaService.getRandomCharacter());
  }

  ngOnInit() {
    this.successfulMatchSubject.subscribe(state => console.log(state));
  }

}
