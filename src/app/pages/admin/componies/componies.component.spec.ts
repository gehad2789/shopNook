import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponiesComponent } from './componies.component';

describe('ComponiesComponent', () => {
  let component: ComponiesComponent;
  let fixture: ComponentFixture<ComponiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
