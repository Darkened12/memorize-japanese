import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JapaneseAlphabet } from 'src/app/models/japanese-alphabet.model';
import hiragana from 'src/app/datasets/hiragana.dataset';
import { BehaviorSubject } from 'rxjs';
import katakana from 'src/app/datasets/katakana.dataset';

@Component({
  selector: 'app-letters-selection',
  templateUrl: './letters-selection.component.html',
  styleUrls: ['./letters-selection.component.css']
})
export class LettersSelectionComponent {
  alphabet$ = new BehaviorSubject<JapaneseAlphabet[]>([]);
  checkboxes: { id: string, value: string, label: string, checked: boolean }[] = [];
  selectAllChecked: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const alphabetName = params['alphabet'];
      
      if (alphabetName === 'hiragana') {
        this.alphabet$.next(hiragana);
      }

      else if (alphabetName === 'katakana') {
        this.alphabet$.next(katakana);
      }
      
      else { 
        this.router.navigate(['/']); 
      }
      
      this.createCheckboxes();
    });
  }
  

  createCheckboxes() {
    const uniqueLetters = Array.from(new Set(this.alphabet$.getValue().map((letter: JapaneseAlphabet) => letter.type)));
  
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
  
    this.activatedRoute.queryParams.subscribe(params => {
      this.router.navigate(
          ['/game'], { queryParams: { alphabet: params['alphabet'], letters: checkedLetters } }
        );
    })
  }
  

}
