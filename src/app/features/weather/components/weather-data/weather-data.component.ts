import { Component, Input } from '@angular/core';
import { WeatherResponseDTO } from '../../../../models/weather-response.dto';
import { FavoritesService } from '../../../../core/services/favorites.service';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss'
})
export class WeatherDataComponent {

  @Input() currentWeather!: WeatherResponseDTO;

}
