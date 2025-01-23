import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { FavoritesRoutingModule } from './favorites.routing';



@NgModule({
  declarations: [FavoritesListComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
