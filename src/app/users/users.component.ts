import { Component, OnInit } from "@angular/core";
import { take, tap } from "rxjs/operators";

import { PageModel } from "../lib/table/table.model";
import { User } from "./user.model";
import { UsersService } from "./users.service";

@Component({
  selector: "exads-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  columns = [
    { prop: "username", name: "Username" },
    { prop: "full_name", name: "Full Name" },
    { name: "Email" },
    { name: "Status", cellClass: this.setStatusCellClass },
    { prop: "created_date", name: "Date Created" },
  ];
  rows: User[];

  count: number;
  page: PageModel = { page: 0, limit: 20 };
  loading = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  changePageSize(limit: number) {
    this.page.limit = limit;
    this.getUsers();
  }

  setPage(page: PageModel) {
    this.page = page;
    this.getUsers();
  }

  private getUsers() {
    this.loading = true;
    this.usersService
      .getUsers({ ...this.page })
      .pipe(
        tap(({ users, count }) => {
          this.rows = users;
          this.count = count;
          this.loading = false;
        }),
        take(1)
      )
      .subscribe();
  }

  private setStatusCellClass(status): string {
    return ` exads-${status.value.toLowerCase()}`;
  }
}
