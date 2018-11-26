import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ResetComponent } from './reset.component';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetComponent ],
      imports: [BrowserModule]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ResetComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be invalid', () => {
    expect(component.model.password).toEqual('');

    expect(component.model.password).toBeFalsy();
  });
  it('should be valid', () => {
    expect(component.model.password).toEqual('abc123');
    expect(component.model.password).toEqual('@qwert');

    expect(component.model.password).toBeTruthy();
  });
});
