import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component'
import { FlashCardService } from './services/flashcard.service';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [FlashCardService],
  exports: [MainComponent]
})
export class TripleFlashModule { }