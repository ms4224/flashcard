import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiMatchComponent } from './kanji-match.component';

describe('KanjiMatchComponent', () => {
  let component: KanjiMatchComponent;
  let fixture: ComponentFixture<KanjiMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanjiMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
