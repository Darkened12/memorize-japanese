import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, take } from 'rxjs';
import { JapaneseLetter, WeightedJapaneseLetter } from 'src/app/models/japanese-alphabet.model';
import { AlphabetService } from 'src/app/services/alphabet.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  weightedAlphabetSubject = new BehaviorSubject<WeightedJapaneseLetter[]>([]);
  japaneseLetterSubject = new ReplaySubject<WeightedJapaneseLetter>(1);
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

      const weightedAlphabet = this.alphabetService.getWeightedAlphabet(alphabet, params['letters']);
      this.weightedAlphabetSubject.next(weightedAlphabet);
      this.nextLetter();
    });
  }

  updateWeight(targetLetter: WeightedJapaneseLetter, increment: boolean) {
    const currentAlphabet = this.weightedAlphabetSubject.getValue();
    const refactoredAlphabet = currentAlphabet.map(letter => {
      if (targetLetter === letter) {
        if (increment) { letter.weight += 2; }
        else { letter.weight -= 1; }
        
        return letter
      }
      return letter;
    })
    this.weightedAlphabetSubject.next(refactoredAlphabet);
  }

  onBackButtonClick() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.router.navigate(['/letters-selection'], { queryParams: params});
    })
 
  }

  onInputUpdate(event: string) {
    if (event !== '') {
      this.japaneseLetterSubject.pipe(take(1)).subscribe(letter => {
        if (event.toLowerCase() == letter.romanji) {
          this.updateWeight(letter, true);
          this.successfulMatchSubject.next(true);
        } else {
          this.updateWeight(letter, false);
          this.successfulMatchSubject.next(false);
        }
      }).unsubscribe();
    }
    else {
      this.nextLetter();
    }

  }

  getLettersWithLowestWeight(letters: WeightedJapaneseLetter[]): WeightedJapaneseLetter[] {
    const minWeight = Math.min(...letters.map(letter => letter.weight));
    const lettersWithLowestWeight = letters.filter(letter => letter.weight === minWeight);
    console.log(lettersWithLowestWeight);
    return lettersWithLowestWeight;
  }
  
  
  getRandomLetter(): WeightedJapaneseLetter {
    const japaneseLetters = this.weightedAlphabetSubject.getValue();
    const lettersWithLowestWeight = this.getLettersWithLowestWeight(japaneseLetters);
    const randomIndex = Math.floor(Math.random() * lettersWithLowestWeight.length);
    const desiredLetter = lettersWithLowestWeight[randomIndex];
    return desiredLetter;
  }
  
  
  nextLetter() {
    this.japaneseLetterSubject.next(this.getRandomLetter());
  }

}
