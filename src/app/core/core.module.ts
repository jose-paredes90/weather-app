import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from './services/history.service';
import { FavoritesService } from './services/favorites.service';
import { DialogService } from './services/dialog.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [HistoryService, FavoritesService, DialogService]
})
export class CoreModule { }
