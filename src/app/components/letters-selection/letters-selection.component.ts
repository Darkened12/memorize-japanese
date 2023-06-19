import { Component } from '@angular/core';
import { Router } from '@angular/router';
import hiragana, { HiraganaLetter } from 'src/app/models/hiragana.model';

@Component({
  selector: 'app-letters-selection',
  templateUrl: './letters-selection.component.html',
  styleUrls: ['./letters-selection.component.css']
})
export class LettersSelectionComponent {
  checkboxes: { id: string, value: string, label: string, checked: boolean }[] = [];
  selectAllChecked: boolean = false;

  constructor(private router: Router) {
    this.createCheckboxes();
  }

  createCheckboxes() {
    const uniqueLetters = Array.from(new Set(hiragana.map((letter: HiraganaLetter) => letter.letter)));
  
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
  

  onSubmit() {
    const checkedLetters = this.checkboxes
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  
    this.router.navigate(['/game'], { queryParams: { letters: checkedLetters } });
  }
  

}
