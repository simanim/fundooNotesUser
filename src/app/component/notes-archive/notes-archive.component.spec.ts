import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesArchiveComponent } from './notes-archive.component';

describe('NotesArchiveComponent', () => {
  let component: NotesArchiveComponent;
  let fixture: ComponentFixture<NotesArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
