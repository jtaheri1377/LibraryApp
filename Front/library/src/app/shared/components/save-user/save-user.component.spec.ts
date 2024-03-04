import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveUserComponent } from './save-user.component';

describe('SaveUserComponent', () => {
  let component: SaveUserComponent;
  let fixture: ComponentFixture<SaveUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveUserComponent]
    });
    fixture = TestBed.createComponent(SaveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
