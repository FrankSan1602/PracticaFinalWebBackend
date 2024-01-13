import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoformComponent } from './eventoform.component';

describe('EventoformComponent', () => {
  let component: EventoformComponent;
  let fixture: ComponentFixture<EventoformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoformComponent]
    });
    fixture = TestBed.createComponent(EventoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
