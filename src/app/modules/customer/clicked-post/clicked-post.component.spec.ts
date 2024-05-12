import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickedPostComponent } from './clicked-post.component';

describe('ClickedPostComponent', () => {
  let component: ClickedPostComponent;
  let fixture: ComponentFixture<ClickedPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickedPostComponent]
    });
    fixture = TestBed.createComponent(ClickedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
