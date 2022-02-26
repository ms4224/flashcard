import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component'
import { FlashCardService } from './services/flashcard.service';
import { CardComponent } from './components/card/card.component';
import { BaseComponent } from './components/base/base.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { RequestService } from './services/request.service';
import { HttpClientModule } from '@angular/common/http';
import { InsertCardComponent } from './components/insert-card/insert-card.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { NewDeckComponent } from './components/new-deck/new-deck.component';
import { ReviewComponent } from './components/review/review.component';

@NgModule({
  declarations: [
    MainComponent,
    CardComponent,
    BaseComponent,
    InsertCardComponent,
    ListViewComponent,
    NewDeckComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [FlashCardService, RequestService],
  exports: [BaseComponent]
})
export class TripleFlashModule { }