import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { HistoryRoutingModule } from './history.routing';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { HistoryDetailComponent } from './components/history-detail/history-detail.component';
import { WeatherResultComponent } from '../../shared/components';



@NgModule({
  declarations: [HistoryListComponent, HistoryDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    HistoryRoutingModule
  ]
})
export class HistoryModule { }
