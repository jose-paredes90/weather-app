import { Component, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { HistoryService } from '../../../../core/services/history.service';
import { WeatherResponseDTO } from '../../../../models/weather-response.dto';
import { WeatherService } from '../../services/weather.service';
import { FavoritesService } from '../../../../core/services/favorites.service';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrl: './weather-search.component.scss'
})
export class WeatherSearchComponent implements AfterViewInit {

  searchControl = new FormControl('');
  suggestions$: Observable<any[]>;
  currentWeather!: WeatherResponseDTO;
  loading: boolean = false;

  get temperatureC(): string {
    return `${this.currentWeather?.current?.temp_c}°C`;
  }

  get temperatureF(): string {
    return `${this.currentWeather?.current?.temp_f}°F`;
  }
  
  constructor(private readonly weatherService: WeatherService,
    private readonly historyService: HistoryService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly favoritesService: FavoritesService,
    private readonly router: Router) {

    this.search();
  }
  
    addFavorite(item: WeatherResponseDTO) {
      this.favoritesService.addToFavorites(item);
    }
  ngAfterViewInit() {
    const name = this.activatedRoute.snapshot.queryParamMap.get('name') || '';
    if (name) {
      this.searchControl.setValue(name);
      this.onCitySelected(name);
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { name: null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });

    }
  }

  search() {
    this.suggestions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query) {
          return [];
        }
        return this.weatherService.searchCity(query);
      })
    );
  }

  onCitySelected(city: string) {
    this.loading = true;
    this.weatherService.getWeather(city)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.historyService.addHistory(response);
          this.currentWeather = response;
        },
        error: () => this.loading = false
      })
  }
  
}
