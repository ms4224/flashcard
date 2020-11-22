import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'tripleflash-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  public showAdmin: boolean = false;
  public showCards: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }
}