import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HiraganaLetter } from 'src/app/models/hiragana.model';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent {
  @Input() hiraganaLetter$!: Observable<HiraganaLetter>;
}
