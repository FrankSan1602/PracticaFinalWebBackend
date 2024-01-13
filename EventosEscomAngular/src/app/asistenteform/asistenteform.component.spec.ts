import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteformComponent } from './asistenteform.component';

describe('AsistenteformComponent', () => {
  let component: AsistenteformComponent;
  let fixture: ComponentFixture<AsistenteformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsistenteformComponent]
    });
    fixture = TestBed.createComponent(AsistenteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
