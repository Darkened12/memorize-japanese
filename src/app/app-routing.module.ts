import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { StartingMenuComponent } from './components/starting-menu/starting-menu.component';

const routes: Routes = [
  {path: '', component: StartingMenuComponent},
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
