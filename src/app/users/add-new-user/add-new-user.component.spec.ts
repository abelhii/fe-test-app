import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import { UsersService } from "../users.service";

import { AddNewUserComponent } from "./add-new-user.component";

describe("AddNewUserComponent", () => {
  let component: AddNewUserComponent;
  let fixture: ComponentFixture<AddNewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewUserComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [UsersService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call addNewUser and router.navigate on addNewUser", async () => {
    const routerNavigate = spyOn(component["router"], "navigate");
    const addNewUser = spyOn(
      component["usersService"],
      "addNewUser"
    ).and.callFake((user) => of(user));

    component.addNewUser();
    await fixture.whenStable();
    expect(addNewUser).toHaveBeenCalledTimes(1);
    expect(routerNavigate).toHaveBeenCalledTimes(1);
  });

  describe("checkIfUsernameExists", () => {
    it("should call doesUsernameExist and setErrors", async () => {
      const setErrors = spyOn(
        component.addUserForm.controls.username,
        "setErrors"
      );
      const doesUsernameExist = spyOn(
        component["usersService"],
        "doesUsernameExist"
      ).and.callFake(() => of(true));

      component.checkIfUsernameExists("");
      await fixture.whenStable();
      expect(doesUsernameExist).toHaveBeenCalledTimes(1);
      expect(setErrors).toHaveBeenCalledTimes(1);
    });
  });

  describe("getErrorMessage", () => {
    it('should return "This username already exists. It can\'t be repeated"', () => {
      component.addUserForm = component["fb"].group({ test: [""] });
      component.addUserForm.controls["test"].setErrors({
        usernameExists: true,
      });
      const errorMessage = component.getErrorMessage("test");

      expect(errorMessage).toEqual(
        "This username already exists. It can't be repeated"
      );
    });

    it('should return "Invalid character in username"', () => {
      component.addUserForm = component["fb"].group({ test: [""] });
      component.addUserForm.controls["test"].setErrors({ pattern: true });
      const errorMessage = component.getErrorMessage("test");

      expect(errorMessage).toEqual("Invalid character in username");
    });

    it('should return "Not a valid email"', () => {
      component.addUserForm = component["fb"].group({ test: [""] });
      component.addUserForm.controls["test"].setErrors({ email: true });
      const errorMessage = component.getErrorMessage("test");

      expect(errorMessage).toEqual("Not a valid email");
    });
  });

  it("should call console.error and window.alert on handleError ", () => {
    const error = { error: { message: "error message" } };
    const consoleError = spyOn(console, "error");
    const alert = spyOn(window, "alert");
    component["handleError"](error);

    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledTimes(1);
  });
});
