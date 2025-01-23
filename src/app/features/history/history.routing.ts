import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryDetailComponent } from './components/history-detail/history-detail.component';
import { HistoryListComponent } from './components/history-list/history-list.component';

const routes: Routes = [
    { path: '', component: HistoryListComponent },
    {
      path: 'detail/:id',
      component: HistoryDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}