import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component'
import { FlashCardService } from './services/flashcard.service';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    MainComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [FlashCardService],
  exports: [MainComponent]
})
export class TripleFlashModule { }