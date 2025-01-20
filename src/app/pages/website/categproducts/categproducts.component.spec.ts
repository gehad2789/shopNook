import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategproductsComponent } from './categproducts.component';

describe('CategproductsComponent', () => {
  let component: CategproductsComponent;
  let fixture: ComponentFixture<CategproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
