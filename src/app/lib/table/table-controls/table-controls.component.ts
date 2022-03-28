import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "exads-table-controls",
  templateUrl: "./table-controls.component.html",
  styleUrls: ["./table-controls.component.scss"],
})
export class TableControlsComponent {
  @Input() limit = 20;

  @Output() pageSizeEvent = new EventEmitter<number>();

  pageSizes = [10, 20, 50, 70, 100];
  
  getData() {
    this.pageSizeEvent.emit(this.limit);
  }
}
