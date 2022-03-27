import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
} from "@angular/material";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { UsersComponent } from "./users.component";
import { UsersService } from "./users.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [UsersService],
})
export class UsersModule {}
