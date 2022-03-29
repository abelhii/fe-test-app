import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { of, Subscription } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  take,
  tap,
} from "rxjs/operators";

import { UserResponse } from "../user.model";
import { UsersService } from "../users.service";

@Component({
  selector: "exads-add-new-user",
  templateUrl: "./add-new-user.component.html",
  styleUrls: ["./add-new-user.component.scss"],
})
export class AddNewUserComponent implements OnInit, OnDestroy {
  addUserForm = this.fb.group({
    username: [
      "",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^((?![{}"\[\].!\s]).)+$/),
      ],
    ],
    first_name: ["", [Validators.required]],
    last_name: [""],
    email: ["", [Validators.required, Validators.email]],
  });
  doesUserNameExist = false;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.addUserForm.controls.username.valueChanges
        .pipe(
          debounceTime(1500),
          distinctUntilChanged(),
          tap((username) => {
            this.checkIfUsernameExists(username);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addNewUser() {
    this.usersService
      .addNewUser(this.addUserForm.value)
      .pipe(catchError(this.handleError), take(1))
      .subscribe((user: UserResponse) => {
        this.router.navigate(["/users"]);
        alert(user.message);
      });
  }

  checkIfUsernameExists(username: string) {
    this.usersService
      .doesUsernameExist(username)
      .pipe(catchError(this.handleError), take(1))
      .subscribe((usernameExists) => {
        if (usernameExists) {
          this.addUserForm.controls.username.setErrors({
            usernameExists: true,
          });
        }
      });
  }

  getErrorMessage(controlName: string) {
    const control = this.addUserForm.controls[controlName];

    if (control.hasError("required")) {
      return `You must enter a value for ${controlName}`;
    }

    if (control.hasError("pattern")) {
      return `Invalid character in username`;
    }

    if (control.hasError("usernameExists")) {
      return "This username already exists. It can't be repeated";
    }

    return control.hasError("email") ? "Not a valid email" : "";
  }

  private handleError(error) {
    const errorMessage = error.error ? error.error.message : error.message;
    console.error(error);
    alert(`Create user failed: ${errorMessage}`);
    return of(error);
  }
}
