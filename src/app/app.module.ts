import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { ScreenComponent } from './components/game/screen/screen.component';
import { InputComponent } from './components/game/input/input.component';
import { FormsModule } from '@angular/forms';
import { LettersSelectionComponent } from './components/letters-selection/letters-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ScreenComponent,
    InputComponent,
    LettersSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
