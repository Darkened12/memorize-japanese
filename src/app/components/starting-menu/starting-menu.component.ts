import { Component } from '@angular/core';
import hiragana, { HiraganaLetter } from 'src/app/models/hiragana.model';

@Component({
  selector: 'app-starting-menu',
  templateUrl: './starting-menu.component.html',
  styleUrls: ['./starting-menu.component.css']
})
export class StartingMenuComponent {
  checkboxes: { id: string, value: string, label: string, checked: boolean }[] = [];
  selectAllChecked: boolean = false;

  constructor() {
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
    console.log(this.checkboxes);
  }
  

}
