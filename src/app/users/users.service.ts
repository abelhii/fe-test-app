import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { User, UserResponse, UserStatus } from "./user.model";

@Injectable()
export class UsersService {
  private url = environment.base + "/users/";

  constructor(private http: HttpClient) {}

  getUsers(param?: { page; limit }): Observable<UserResponse> {
    const params = new HttpParams({ fromObject: param });
    return this.http
      .get<{ data: UserResponse }>(`${this.url}`, { params })
      .pipe(
        map((res) => res.data),
        map((data) => {
          return { ...data, users: data.users.map(this.defineUser) };
        }),
        catchError(this.handleError("getUsers", null))
      );
  }

  private defineUser(user: User): User {
    return {
      ...user,
      full_name: `${user.first_name} ${user.last_name || ""}`,
      status: UserStatus[user.id_status],
      created_date: new Date(user.created_date)
        .toLocaleDateString()
        .replace(new RegExp("/", "g"), "-"),
    };
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
