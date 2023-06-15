import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { ScreenComponent } from './components/game/screen/screen.component';
import { InputComponent } from './components/game/input/input.component';
import { FormsModule } from '@angular/forms';
import { StartingMenuComponent } from './components/starting-menu/starting-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ScreenComponent,
    InputComponent,
    StartingMenuComponent
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
