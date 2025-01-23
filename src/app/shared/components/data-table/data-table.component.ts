import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent<T> implements OnInit {
  @Input() data: T[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize = 10;
  @Input() favorite: boolean = false;

  @Output() onDelete = new EventEmitter<number>();
  @Output() onReconsult = new EventEmitter<string>();
  @Output() onDetail = new EventEmitter<number>();

  dataSource: MatTableDataSource<T>;
  currentPage = 0;
  totalData = 0;

  get displayedColumnsWithActions(): string[] {
    return [...this.displayedColumns, 'actions'];
  }

  ngOnInit(): void {
    this.updateTableData();
  }

  ngOnChanges(): void {
    this.updateTableData();
  }

  updateTableData(): void {
    this.totalData = this.data.length;
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource = new MatTableDataSource(this.data.slice(startIndex, endIndex));
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateTableData();
  }

}
