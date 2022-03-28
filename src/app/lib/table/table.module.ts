import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule, MatSelectModule } from "@angular/material";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { TableComponent } from "./table.component";
import { TableControlsComponent } from "./table-controls/table-controls.component";

@NgModule({
  declarations: [TableComponent, TableControlsComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [TableComponent, TableControlsComponent],
})
export class TableModule {}
