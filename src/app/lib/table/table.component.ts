import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PageModel } from "./table.model";

@Component({
  selector: "exads-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent {
  @Input() page: PageModel = { page: 0, limit: 20 };
  @Input() columns: unknown[];
  @Input() rows: unknown[];
  @Input() count: number;
  @Input() loading = false;

  @Output() changePageEvent = new EventEmitter<PageModel>();

  setPage(pageInfo) {
    this.page.page = pageInfo.offset;
    this.changePageEvent.emit(this.page);
  }
}
