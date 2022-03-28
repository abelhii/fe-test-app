import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableControlsComponent } from './table-controls.component';

describe('TableControlsComponent', () => {
  let component: TableControlsComponent;
  let fixture: ComponentFixture<TableControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableControlsComponent ],
      imports: [BrowserAnimationsModule, MatFormFieldModule, MatSelectModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageSizeEvent on getData', () => {
    const pageSizeEvent = spyOn(component.pageSizeEvent, 'emit');
    component.getData()
    expect(pageSizeEvent).toHaveBeenCalledTimes(1);
  })
});
