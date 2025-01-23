import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityResponseDTO } from '../../../models/city-response.dto';
import { WeatherResponseDTO } from '../../../models/weather-response.dto';

@Injectable()
export class WeatherService {

  private API_KEY = 'ae1e452e94424098a1323813252201';
  private BASE_URL = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<WeatherResponseDTO> {
    const url = `${this.BASE_URL}/current.json`;
    const params = new HttpParams()
      .set('key', this.API_KEY)
      .set('q', city);
    return this.http.get<WeatherResponseDTO>(url, { params });
  }

  searchCity(query: string): Observable<CityResponseDTO[]> {
    const url = `${this.BASE_URL}/search.json`;
    const params = new HttpParams()
      .set('key', this.API_KEY)
      .set('q', query);
    return this.http.get<CityResponseDTO[]>(url, { params });
  }
  
}
