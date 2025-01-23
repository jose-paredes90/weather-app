import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { WeatherResponseDTO } from '../../models/weather-response.dto';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesService]
    });
    service = TestBed.inject(FavoritesService);
    localStorage.clear(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove an item from favorites', () => {
    const item1: WeatherResponseDTO = {
      location: { name: 'Test City 1', localtime: '2023-10-10 10:00', lat: 0, lan: 0 },
      current: { temp_c: 20, temp_f: 68, condition: { text: 'Sunny', icon: 'sunny.png' }, wind_kph: 10, humidity: 50 }
    };
    const item2: WeatherResponseDTO = {
      location: { name: 'Test City 2', localtime: '2023-10-10 10:00', lat: 0, lan: 0 },
      current: { temp_c: 22, temp_f: 72, condition: { text: 'Cloudy', icon: 'cloudy.png' }, wind_kph: 15, humidity: 60 }
    };
  
    service.addToFavorites(item1);
    service.addToFavorites(item2);
  
    const favorites = service.getFavorites();
    const index = favorites.findIndex(fav => fav.location.name === 'Test City 1');
  
    service.removeFavoriteItem(index);
  
    const updatedFavorites = service.getFavorites();
    expect(updatedFavorites.length).toBe(1);
    expect(updatedFavorites[0].location.name).toBe('Test City 2');
  });
  
  

  it('should not add duplicate items to favorites', () => {
    const item: WeatherResponseDTO = {
      location: { name: 'Test City', localtime: '2023-10-10 10:00', lat: 0, lan: 0 },
      current: { temp_c: 20, temp_f: 68, condition: { text: 'Sunny', icon: 'sunny.png' }, wind_kph: 10, humidity: 50 }
    };

    service.addToFavorites(item);
    service.addToFavorites(item);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
  });

  it('should remove an item from favorites', () => {
    const item1: WeatherResponseDTO = {
      location: { name: 'Test City 1', localtime: '2023-10-10 10:00', lat: 0, lan: 0 },
      current: { temp_c: 20, temp_f: 68, condition: { text: 'Sunny', icon: 'sunny.png' }, wind_kph: 10, humidity: 50 }
    };
    const item2: WeatherResponseDTO = {
      location: { name: 'Test City 2', localtime: '2023-10-10 10:00', lat: 0, lan: 0 },
      current: { temp_c: 22, temp_f: 72, condition: { text: 'Cloudy', icon: 'cloudy.png' }, wind_kph: 15, humidity: 60 }
    };
  
    service.addToFavorites(item1);
    service.addToFavorites(item2);
  
    
    let favorites = service.getFavorites();
    console.log('Before removal:', favorites);
  
    
    const index = favorites.findIndex(fav => fav.location.name === 'Test City 1');
    console.log('Index of "Test City 1":', index);
  
    
    service.removeFavoriteItem(index);
  

    favorites = service.getFavorites();
    console.log('After removal:', favorites);
    
    expect(favorites.length).toBe(1);
    expect(favorites[0].location.name).toBe('Test City 2');
  });
  

  it('should get all favorites', () => {
    const item1: WeatherResponseDTO = {
      location: { name: 'Test City 1', localtime: '2023-10-10 10:00', lat: 0, lan: 0 },
      current: { temp_c: 20, temp_f: 68, condition: { text: 'Sunny', icon: 'sunny.png' }, wind_kph: 10, humidity: 50 }
    };
    const item2: WeatherResponseDTO = {
      location: { name: 'Test City 2', localtime: '2023-10-10 10:00', lat: 0, lan: 0 },
      current: { temp_c: 22, temp_f: 72, condition: { text: 'Cloudy', icon: 'cloudy.png' }, wind_kph: 15, humidity: 60 }
    };

    service.addToFavorites(item1);
    service.addToFavorites(item2);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(2);
  });
});