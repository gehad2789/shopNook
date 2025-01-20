import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCartComponent } from './custom-cart.component';

describe('CustomCartComponent', () => {
  let component: CustomCartComponent;
  let fixture: ComponentFixture<CustomCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
