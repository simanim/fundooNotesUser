import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotpassComponent } from './forgotpass.component';

describe('ForgotpassComponent', () => {
  let component: ForgotpassComponent;
  let fixture: ComponentFixture<ForgotpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpassComponent ],
      imports: [BrowserModule]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ForgotpassComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be invalid', () => {
    expect(component.model.email).toEqual('');
    expect(component.model.email).toEqual('Aabc@gmail.com');
    expect(component.model.email).toEqual('@abc.ABC.com');
    expect(component.model.email).toEqual('AbC.23@abc.com');

    expect(component.model.email).toBeFalsy();
  });
  it('should be valid', () => {
    expect(component.model.email).toEqual('abc@gmail.com');
    expect(component.model.email).toEqual('abc123@gmail.com');

    expect(component.model.email).toBeTruthy();
  });

});
