import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HiraganaLetter } from 'src/app/models/hiragana.model';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent {
  wins = new BehaviorSubject(0);
  losses = new BehaviorSubject(0);

  @Input() successfulMatchSubject!: Subject<boolean>;
  @Input() hiraganaLetter$!: Observable<HiraganaLetter>;

  ngOnInit() {
    this.successfulMatchSubject.subscribe(inputMatches => {
      if (inputMatches) {
        this.wins.next(this.wins.value + 1);
      }

      else {
        this.losses.next(this.losses.value + 1);
      }
    })
  }
}
