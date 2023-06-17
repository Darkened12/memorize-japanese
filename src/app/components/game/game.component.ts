import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, take } from 'rxjs';
import { HiraganaLetter } from 'src/app/models/hiragana.model';
import { AlphabetService } from 'src/app/services/alphabet.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  hiraganaLettersSubject = new BehaviorSubject<HiraganaLetter[]>([]);
  hiraganaLetterSubject = new ReplaySubject<HiraganaLetter>(1);
  successfulMatchSubject = new ReplaySubject<boolean>(1);

  constructor(private alphabetService: AlphabetService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const hiraganaLetters = this.alphabetService.getHiraganaLetters(params['letters']);
      this.hiraganaLettersSubject.next(hiraganaLetters);
      this.nextLetter();
    });
    if (this.hiraganaLettersSubject.getValue().length === 0) {
      this.onBackButtonClick();
    }
  }

  onBackButtonClick() {
    this.router.navigate(['/'])
  }

  onInputUpdate(event: string) {
    if (event !== '') {
      this.hiraganaLetterSubject.pipe(take(1)).subscribe(letter => {
        this.successfulMatchSubject.next(event.toLowerCase() == letter.romanji)
      });
    }
    else {
      this.nextLetter();
    }

  }
  
  getRandomLetter(): HiraganaLetter {
    const hiraganaLetters = this.hiraganaLettersSubject.getValue();
    const randomIndex = Math.floor(Math.random() * hiraganaLetters.length);
    const desiredLetter = hiraganaLetters[randomIndex];
    return desiredLetter;
  }
  
  
  nextLetter() {
    this.hiraganaLetterSubject.next(this.getRandomLetter());
  }

}
