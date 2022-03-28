import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableModule } from "../lib/table/table.module";

import { UsersComponent } from "./users.component";
import { UsersService } from "./users.service";

describe("UsersComponent", () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [TableModule, HttpClientModule, BrowserAnimationsModule],
      providers: [UsersService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getUsers on changePageSize", () => {
    const getUsers = spyOn(component as any, "getUsers");
    component.changePageSize(12);
    expect(getUsers).toHaveBeenCalledTimes(1);
  });

  it("should call getUsers on setPage", () => {
    const getUsers = spyOn(component as any, "getUsers");
    component.setPage({ page: 0, limit: 10 });
    expect(getUsers).toHaveBeenCalledTimes(1);
  });

  it("should return ' exads-[class name]' on call setStatusCellClass", () => {
    const status = {value: 'active'};
    const cellClass = component['setStatusCellClass'](status);
    expect(cellClass).toEqual(` exads-${status.value}`)
  });
});
