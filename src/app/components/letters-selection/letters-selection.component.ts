import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JapaneseLetter } from 'src/app/models/japanese-alphabet.model';
import hiragana from 'src/app/datasets/hiragana.dataset';
import { BehaviorSubject } from 'rxjs';
import katakana from 'src/app/datasets/katakana.dataset';

@Component({
  selector: 'app-letters-selection',
  templateUrl: './letters-selection.component.html',
  styleUrls: ['./letters-selection.component.css']
})
export class LettersSelectionComponent {
  alphabetName = new BehaviorSubject<string>('');
  alphabetLetters$ = new BehaviorSubject<JapaneseLetter[]>([]);
  checkboxes: { id: string, value: string, label: string, checked: boolean }[] = [];
  selectAllChecked: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const alphabetName = params['alphabet'];
      this.alphabetName.next(alphabetName);
      
      if (alphabetName === 'hiragana') {
        this.alphabetLetters$.next(hiragana);
      }

      else if (alphabetName === 'katakana') {
        this.alphabetLetters$.next(katakana);
      }
      
      else { 
        this.router.navigate(['/']); 
      }
      
      this.createCheckboxes();
    });
  }
  

  createCheckboxes() {
    const uniqueLetters = Array.from(new Set(this.alphabetLetters$.getValue().map((letter: JapaneseLetter) => letter.type)));
  
    this.checkboxes = uniqueLetters.map((letter: string) => {
      return {
        id: `checkbox_${letter}`,
        value: letter,
        label: letter.toLocaleUpperCase(),
        checked: false
      };
    });
  }

  toggleSelectAll() {
    this.checkboxes.forEach((checkbox) => (checkbox.checked = this.selectAllChecked));
  }
  
  updateSelectAllState() {
    this.selectAllChecked = this.checkboxes.every((checkbox) => checkbox.checked);
  }
  
  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    const checkedLetters = this.checkboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  
    this.router.navigate(
      ['/game'], { queryParams: { alphabet: this.alphabetName.getValue(), letters: checkedLetters } }
    );
  }
  

}
