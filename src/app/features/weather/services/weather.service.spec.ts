import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { WeatherResponseDTO } from '../../../models/weather-response.dto';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data', () => {
    const dummyWeatherData: WeatherResponseDTO = {
      location: { name: 'Test City', localtime: '2023-10-10 10:00', lat: 0, lan: 0 },
      current: { temp_c: 20, temp_f: 68, condition: { text: 'Sunny', icon: 'sunny.png' }, wind_kph: 10, humidity: 50 }
    };
  
    service.getWeather('Test City').subscribe(data => {
      expect(data.location.name).toBe('Test City');
      expect(data.current.temp_c).toBe(20);
    });
  
    const expectedUrl = `https://api.weatherapi.com/v1/current.json?key=ae1e452e94424098a1323813252201&q=Test%20City`;
  
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyWeatherData);
  });
});
