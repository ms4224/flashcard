import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tripleflash-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() flipped: boolean = false;
  @Input() content: string = '';
  @Input() category: string = '';
  constructor () {
  }

  ngOnInit() {
  }

  public onCardClick() {
    this.flipped = true;
  }
}