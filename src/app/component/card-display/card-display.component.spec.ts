import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CardDisplayComponent } from './card-display.component';

describe('CardDisplayComponent', () => {
  let component: CardDisplayComponent;
  let fixture: ComponentFixture<CardDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDisplayComponent ],
      imports: [BrowserModule]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(CardDisplayComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid', () => {
    expect(component.titleValue).toEqual('');

    expect(component.titleValue).toBeFalsy();
    // expect(component.descriptionValue).toBeFalsy();
  });
  it('should be valid', () => {
    expect(component.titleValue).toEqual('abcdefg');
    expect(component.descriptionValue).toEqual('qwert123');

    expect(component.titleValue).toBeTruthy();
    expect(component.descriptionValue).toBeTruthy();
  });
});
