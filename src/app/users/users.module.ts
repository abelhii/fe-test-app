import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
} from "@angular/material";

import { TableModule } from "../lib/table/table.module";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { UsersService } from "./users.service";
import { AddNewUserComponent } from "./add-new-user/add-new-user.component";

@NgModule({
  declarations: [UsersComponent, AddNewUserComponent],
  imports: [
    UsersRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TableModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
