import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { LettersSelectionComponent } from './components/letters-selection/letters-selection.component';

const routes: Routes = [
  {path: '', component: LettersSelectionComponent},
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
