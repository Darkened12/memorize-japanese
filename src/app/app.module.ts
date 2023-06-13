import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameScreenComponent } from './components/game/game-screen/game-screen.component';
import { GameComponent } from './components/game/game.component';
import { ScreenComponent } from './components/game/screen/screen.component';

@NgModule({
  declarations: [
    AppComponent,
    GameScreenComponent,
    GameComponent,
    ScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
