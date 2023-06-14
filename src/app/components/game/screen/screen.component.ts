import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, merge } from 'rxjs';
import { HiraganaLetter } from 'src/app/models/hiragana.model';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent {
  wins = new BehaviorSubject<number>(0);
  losses = new BehaviorSubject<number>(0);

  MatchStatusToggleSubject = new BehaviorSubject<boolean>(false);

  @Input() successfulMatchSubject!: ReplaySubject<boolean>;
  @Input() hiraganaLetter$!: Observable<HiraganaLetter>;

  private _matchStatusToggleHandler() {
    merge(this.successfulMatchSubject, this.hiraganaLetter$).subscribe(value => {
      if (typeof value === 'boolean') {
        this.MatchStatusToggleSubject.next(true);
      }
      else {
        this.MatchStatusToggleSubject.next(false);
      }
    });
  }

  private _successfulMatchHandler() {
    this.successfulMatchSubject.subscribe(inputMatches => {
      if (inputMatches) {
        this.wins.next(this.wins.value + 1);
      }

      else {
        this.losses.next(this.losses.value + 1);
      }
    })
  }

  ngOnInit() {
    this._matchStatusToggleHandler();
    this._successfulMatchHandler();

  }
}
