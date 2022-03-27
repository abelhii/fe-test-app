import { Component, OnInit } from "@angular/core";
import { take, tap } from "rxjs/operators";
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
    {
      name: "Status",
      cellClass: (status) => ` exads-${status.value.toLowerCase()}`,
    },
    { prop: "created_date", name: "Date Created" },
  ];

  rows: User[];
  count: number;
  pageSizes = [10, 20, 50, 70, 100];
  page = 0;
  limit = 20;
  loading = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.usersService
      .getUsers({ page: this.page, limit: this.limit })
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

  // TODO: move following logic into a separate table.component.ts
  setPage(pageInfo) {
    this.page = pageInfo.offset;
    this.getUsers()
  }

  onSort(event) {
    // event was triggered, start sort sequence
    console.log('Sort Event', event);
    this.loading = true;
    // emulate a server request with a timeout
    setTimeout(() => {
      const rows = [...this.rows];
      // this is only for demo purposes, normally
      // your server would return the result for
      // you and you would just set the rows prop
      const sort = event.sorts[0];
      rows.sort((a, b) => {
        return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
      });

      this.rows = rows;
      this.loading = false;
    }, 1000);
  }
}
