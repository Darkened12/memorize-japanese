import { Component } from '@angular/core';
import { HiraganaService } from 'src/app/services/hiragana.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent {
  constructor(public hiraganaService: HiraganaService ) {}
}
