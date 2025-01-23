import { Injectable } from '@angular/core';
import { WeatherResponseDTO } from '../../models/weather-response.dto';

@Injectable()
export class FavoritesService {

  private favoritesKey = 'favorites';

  getFavorites(): WeatherResponseDTO[] {
    return JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
  }

  addToFavorites(item: WeatherResponseDTO): void {
    const favorites = this.getFavorites();
    const exist = favorites.some(x => x.location.name == item.location.name);
    if (!exist) {
      favorites.unshift(item);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  removeFavoriteItem(id: number): void {
    const favorites = this.getFavorites();
    favorites.splice(id, 1);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

}
