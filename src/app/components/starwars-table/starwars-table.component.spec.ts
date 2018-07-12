
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarwarsTableComponent } from './starwars-table.component';

describe('StarwarsTableComponent', () => {
  let component: StarwarsTableComponent;
  let fixture: ComponentFixture<StarwarsTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StarwarsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarwarsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
