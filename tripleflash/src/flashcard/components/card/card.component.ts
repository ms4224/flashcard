import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'tripleflash-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flip', [
      state('notFlipped', style({
        backgroundColor: '#262a2c',
        color: 'white'
      })),
      state('flipped', style({
        backgroundColor: '#f5f5f5',
        color: '#262a2c'
      })),
      transition('notFlipped => flipped', [
        animate('0.1s')
      ]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  @Input() flipped: boolean = false;
  @Input() content: string = '';
  @Input() category: string = '';
  constructor() {
  }

  ngOnInit() {
  }

  public onCardClick() {
    this.flipped = true;
  }
}