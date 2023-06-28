import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, take } from 'rxjs';
import { JapaneseLetter, WeightedJapaneseLetter } from 'src/app/models/japanese-alphabet.model';
import { AlphabetService } from 'src/app/services/alphabet.service';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  weightedAlphabetSubject = new BehaviorSubject<WeightedJapaneseLetter[]>([]);
  lowestWeightLetters = new BehaviorSubject<WeightedJapaneseLetter[]>([]);
  alphabetGeneratorObject = this._alphabetGenerator();
  japaneseLetterSubject = new ReplaySubject<WeightedJapaneseLetter>(1);
  successfulMatchSubject = new ReplaySubject<boolean>(1);

  constructor(private alphabetService: AlphabetService, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private utils: UtilsService) { }

  ngOnInit() {
    this.alphabetInitialization();
    this.lowestWeightLetters.subscribe(value => console.log(value));
  }

  alphabetInitialization() {
    this.activatedRoute.queryParams.subscribe(params => {
      const alphabetName: string | undefined = params['alphabet'];
      const lettersToInclude: string[] | undefined = params['letters'];

      if (alphabetName === undefined) {
        return this.router.navigate(['/']);
      }

      if (lettersToInclude === undefined) {
        return this.onBackButtonClick();
      }

      if (lettersToInclude.length === 0) {
        return this.onBackButtonClick();
      }

      const weightedAlphabet = this.alphabetService.getWeightedAlphabet(alphabetName, lettersToInclude);
      const shuffledAlphabet = this.utils.shuffleArray(weightedAlphabet);
      this.weightedAlphabetSubject.next(shuffledAlphabet);

      this.updateAlphabetGenerator();
    });
    this.nextLetter();
  }

  updateLowestWeightLettersSubject() {
    const currentAlphabetValue = this.weightedAlphabetSubject.getValue();
    const newWeightedLetters = this.getLettersWithLowestWeight(currentAlphabetValue);
    const shuffledNewLetters = this.utils.shuffleArray(newWeightedLetters);
    this.lowestWeightLetters.next(shuffledNewLetters);
  }

  updateWeight(targetLetter: WeightedJapaneseLetter, increment: boolean) {
    const currentAlphabet = this.weightedAlphabetSubject.getValue();
    const refactoredAlphabet = currentAlphabet.map(letter => {
      if (targetLetter === letter) {
        if (increment) { letter.weight += 2; }
        else { letter.weight += 1; }
        
        return letter
      }
      return letter;
    })
    this.weightedAlphabetSubject.next(refactoredAlphabet);
  }

  updateAlphabetGenerator() {
    this.alphabetGeneratorObject = this._alphabetGenerator(); 
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
    return lettersWithLowestWeight;
  }
  
  private *_alphabetGenerator() {
    this.updateLowestWeightLettersSubject()
    const letters = this.lowestWeightLetters.getValue();
    for (const letter of letters) {
      yield this.japaneseLetterSubject.next(letter);
    }
    this.updateAlphabetGenerator();
    this.nextLetter();
    ;
  }
  
  nextLetter() {
    this.alphabetGeneratorObject.next();
  }

}
