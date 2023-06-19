import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { LettersSelectionComponent } from './components/letters-selection/letters-selection.component';
import { AlphabetSelectionComponent } from './components/alphabet-selection/alphabet-selection.component';

const routes: Routes = [
  {path: '', component: AlphabetSelectionComponent},
  {path: 'letters-selection', component: LettersSelectionComponent},
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
