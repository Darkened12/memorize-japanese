import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, take } from 'rxjs';
import { JapaneseAlphabet } from 'src/app/models/japanese-alphabet.model';
import { AlphabetService } from 'src/app/services/alphabet.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  japaneseLettersSubject = new BehaviorSubject<JapaneseAlphabet[]>([]);
  japaneseLetterSubject = new ReplaySubject<JapaneseAlphabet>(1);
  successfulMatchSubject = new ReplaySubject<boolean>(1);

  constructor(private alphabetService: AlphabetService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const alphabet: string | undefined = params['alphabet'];
      const lettersToInclude: string[] | undefined = params['letters'];

      if (alphabet === undefined) {
        return this.router.navigate(['/']);
      }

      if (lettersToInclude === undefined) {
        return this.onBackButtonClick();
      }

      if (lettersToInclude.length === 0) {
        return this.onBackButtonClick();
      }

      const japaneseLetters = this.alphabetService.getjapaneseLetters(alphabet, params['letters']);
      this.japaneseLettersSubject.next(japaneseLetters);
      this.nextLetter();
    });
  }

  onBackButtonClick() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.router.navigate(['/letters-selection'], { queryParams: params});
    })
 
  }

  onInputUpdate(event: string) {
    if (event !== '') {
      this.japaneseLetterSubject.pipe(take(1)).subscribe(letter => {
        this.successfulMatchSubject.next(event.toLowerCase() == letter.romanji)
      });
    }
    else {
      this.nextLetter();
    }

  }
  
  getRandomLetter(): JapaneseAlphabet {
    const japaneseLetters = this.japaneseLettersSubject.getValue();
    const randomIndex = Math.floor(Math.random() * japaneseLetters.length);
    const desiredLetter = japaneseLetters[randomIndex];
    return desiredLetter;
  }
  
  
  nextLetter() {
    this.japaneseLetterSubject.next(this.getRandomLetter());
  }

}
