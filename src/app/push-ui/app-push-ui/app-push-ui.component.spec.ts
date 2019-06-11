import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPushUiComponent } from './app-push-ui.component';

describe('AppPushUiComponent', () => {
  let component: AppPushUiComponent;
  let fixture: ComponentFixture<AppPushUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPushUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPushUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
