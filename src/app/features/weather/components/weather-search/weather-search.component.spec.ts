import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { WeatherSearchComponent } from './weather-search.component';
import { WeatherService } from '../../services/weather.service';
import { HistoryService } from '../../../../core/services/history.service';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { WeatherResponseDTO } from '../../../../models/weather-response.dto';
import { SharedModule } from '../../../../shared/shared.module';
import { WeatherDataComponent } from '../weather-data/weather-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Test suite
describe('WeatherSearchComponent', () => {
  let component: WeatherSearchComponent;
  let fixture: ComponentFixture<WeatherSearchComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;
  let mockHistoryService: jasmine.SpyObj<HistoryService>;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['searchCity', 'getWeather']);
    mockWeatherService.searchCity.and.returnValue(of([]));
    mockWeatherService.getWeather.and.returnValue(of({} as any));
    
    mockHistoryService = jasmine.createSpyObj('HistoryService', ['addHistory']);
    mockFavoritesService = jasmine.createSpyObj('FavoritesService', ['addToFavorites', 'getFavorites']);
    mockFavoritesService.getFavorites.and.returnValue([]);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
        snapshot: {
          queryParamMap: {
            get: (key: string) => (key === 'name' ? 'London' : null),
          } as any,
        },
      } as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [WeatherSearchComponent, WeatherDataComponent],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, SharedModule],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: HistoryService, useValue: mockHistoryService },
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with query parameter and call onCitySelected', () => {
    spyOn(component, 'onCitySelected');
    component.ngAfterViewInit();
    expect(component.searchControl.value).toBe('London');
    expect(component.onCitySelected).toHaveBeenCalledWith('London');
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      relativeTo: mockActivatedRoute,
      queryParams: { name: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  });

  it('should handle onCitySelected and update currentWeather', () => {
    const mockWeatherResponse: WeatherResponseDTO = {
      location: { name: 'New York', localtime: '2025-01-01 10:00', lan: -77.05, lat: -12.05 },
      current: {
        temp_c: 20,
        temp_f: 68,
        wind_kph: 15,
        humidity: 60,
        condition: { text: 'Sunny', icon: 'sunny-icon' },
      },
    };
    mockWeatherService.getWeather.and.returnValue(of(mockWeatherResponse));

    component.onCitySelected('New York');
    expect(mockWeatherService.getWeather).toHaveBeenCalledWith('New York');
    expect(mockHistoryService.addHistory).toHaveBeenCalledWith(mockWeatherResponse);

    fixture.whenStable().then(() => {
      expect(component.currentWeather).toEqual(mockWeatherResponse);
    });
  });

  it('should add a city to favorites', () => {
    const mockWeatherResponse: WeatherResponseDTO = {
      location: { name: 'New York', localtime: '2025-01-01 10:00', lan: -77.05, lat: -12.05 },
      current: {
        temp_c: 20,
        temp_f: 68,
        wind_kph: 15,
        humidity: 60,
        condition: { text: 'Sunny', icon: 'sunny-icon' },
      },
    };

    component.addFavorite(mockWeatherResponse);
    expect(mockFavoritesService.addToFavorites).toHaveBeenCalledWith(mockWeatherResponse);
  });

  it('should check if a city is favorite', () => {
    const mockWeatherResponse: WeatherResponseDTO = {
      location: { name: 'New York', localtime: '2025-01-01 10:00', lan: -77.05, lat: -12.05 },
      current: {
        temp_c: 20,
        temp_f: 68,
        wind_kph: 15,
        humidity: 60,
        condition: { text: 'Sunny', icon: 'sunny-icon' },
      },
    };

    mockFavoritesService.getFavorites.and.returnValue([mockWeatherResponse]);
    component.currentWeather = mockWeatherResponse;

    expect(component.isFavorite).toBeTrue();
  });
});
