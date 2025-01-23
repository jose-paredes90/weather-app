import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';
import { WeatherResponseDTO } from '../../models/weather-response.dto';

describe('HistoryService', () => {
  let service: HistoryService;

  const mockWeather: WeatherResponseDTO = {
    location: {
      name: 'Test City',
      localtime: '2025-01-22 10:00',
      lat: 0,
      lan: 0
    },
    current: {
      temp_c: 20,
      temp_f: 68,
      condition: {
        text: 'Sunny',
        icon: 'sunny.png'
      },
      wind_kph: 10,
      humidity: 50
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryService]
    });
    service = TestBed.inject(HistoryService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to history', () => {
    service.addHistory(mockWeather);
    const history = service.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].location.name).toBe('Test City');
  });

  it('should retrieve an item by ID from history', () => {
    service.addHistory(mockWeather);
    const item = service.getHistoryById(0);
    expect(item.location.name).toBe('Test City');
  });

  it('should remove an item from history', () => {
    service.addHistory(mockWeather);
    service.addHistory({
      ...mockWeather,
      location: { ...mockWeather.location, name: 'Second City' }
    });
    service.removeHistoryItem(0);
    const history = service.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].location.name).toBe('Test City');
  });

  it('should clear all history', () => {
    service.addHistory(mockWeather);
    service.clearHistory();
    const history = service.getHistory();
    expect(history.length).toBe(0);
  });
});