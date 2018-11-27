import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CreateLabelComponent } from './create-label.component';

describe('CreateLabelComponent', () => {
  let component: CreateLabelComponent;
  let fixture: ComponentFixture<CreateLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLabelComponent ],
      imports: [BrowserModule]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(CreateLabelComponent);
      component = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid', () => {
    expect(component.model.labelName).toEqual('');
    expect(component.model.newName).toEqual('');
    // expect(component.model.labelName).toEqual('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // expect(component.model.newName).toEqual('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  
    expect(component.model.labelName).toBeFalsy();
    expect(component.model.newName).toBeFalsy();
  });
  it('should be valid', () => {
    expect(component.model.labelName).toEqual('abcdefghijklmnopqrst');
    expect(component.model.newName).toEqual('xyz');

    expect(component.model.labelName).toBeTruthy();
    expect(component.model.newName).toBeTruthy();
  });
});
