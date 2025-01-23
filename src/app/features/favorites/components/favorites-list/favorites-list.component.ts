import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../core/services/dialog.service';
import { FavoritesService } from '../../../../core/services/favorites.service';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent implements OnInit {

  favoritesList: any;
  columns: string[] = ['name', 'localtime', 'temp_c', 'condition', 'wind_kph', 'humidity'];
  
  constructor(private readonly favoriteService: FavoritesService,
    private readonly dialogService: DialogService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favoritesList = this.favoriteService.getFavorites()
      .map(fav => ({
        name: fav.location.name,
        localtime: fav.location.localtime,
        temp_c: fav.current.temp_c,
        condition: fav.current.condition.text,
        wind_kph: fav.current.wind_kph,
        humidity: fav.current.humidity,
      }));
  }

  onDelete(id: number) {
    this.dialogService.confirmationModal('¿Está seguro que quiere eliminar este registro de sus favoritos?')
      .afterClosed().subscribe((response: boolean) => {
        if (response) {
          this.favoriteService.removeFavoriteItem(id);
          this.getFavorites();
        }
      })
  }
}
