import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
} from "@angular/material";

import { TableModule } from "../lib/table/table.module";

import { UsersComponent } from "./users.component";
import { UsersService } from "./users.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    TableModule
  ],
  providers: [UsersService],
})
export class UsersModule {}
