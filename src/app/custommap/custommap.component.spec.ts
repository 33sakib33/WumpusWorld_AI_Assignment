import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustommapComponent } from './custommap.component';

describe('CustommapComponent', () => {
  let component: CustommapComponent;
  let fixture: ComponentFixture<CustommapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustommapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustommapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
