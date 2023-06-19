import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alphabet-selection',
  templateUrl: './alphabet-selection.component.html',
  styleUrls: ['./alphabet-selection.component.css']
})
export class AlphabetSelectionComponent {
  constructor(private router: Router) {}

  navigateToLettersSelection(alphabet: string) {
    this.router.navigate(['/letters-selection'], { queryParams: { alphabet } });
  }
}
