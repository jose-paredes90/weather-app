import { Component, Input } from '@angular/core';
import { FavoritesService } from '../../../core/services/favorites.service';
import { WeatherResponseDTO } from '../../../models/weather-response.dto';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.scss'
})
export class WeatherResultComponent {

  @Input() weatherItem: WeatherResponseDTO;
  @Input() favorite: boolean = false;

  get temperatureC(): string {
    return `${this.weatherItem?.current?.temp_c}°C`;
  }

  get temperatureF(): string {
    return `${this.weatherItem?.current?.temp_f}°F`;
  }

  constructor(private readonly favoritesService: FavoritesService) {}

  addFavorite(item: WeatherResponseDTO) {
    this.favoritesService.addToFavorites(item);
  }
}
