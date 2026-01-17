import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsOverview } from './items-overview';

describe('ItemsOverview', () => {
  let component: ItemsOverview;
  let fixture: ComponentFixture<ItemsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
