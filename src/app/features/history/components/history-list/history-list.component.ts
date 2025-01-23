import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../../../core/services/history.service';
import { Router } from '@angular/router';
import { DialogService } from '../../../../core/services/dialog.service';
@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss'
})
export class HistoryListComponent implements OnInit {

  historyList: any;
  columns: string[] = ['name', 'localtime', 'temp_c', 'condition', 'wind_kph', 'humidity'];
  
  constructor(private readonly historyService: HistoryService,
    private readonly router: Router,
    private readonly dialogService: DialogService) {}

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    this.historyList = this.historyService.getHistory()
      .map(fav => ({
        name: fav.location.name,
        localtime: fav.location.localtime,
        temp_c: fav.current.temp_c,
        condition: fav.current.condition.text,
        wind_kph: fav.current.wind_kph,
        humidity: fav.current.humidity,
      }));
  }

  onReconsult(name: string) {
    this.router.navigate(['/weather'], { queryParams: { name } });
  }

  onDelete(id: number) {
    this.dialogService.confirmationModal('¿Está seguro que quiere eliminar este registro del historial?')
      .afterClosed().subscribe((response: boolean) => {
        if (response) {
          this.historyService.removeHistoryItem(id);
          this.getHistory();
        }
      })
  }

  onDetail(id: number) {
    this.router.navigate([`/history/detail/${id}`]);
  }

}
