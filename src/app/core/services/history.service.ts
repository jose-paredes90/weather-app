import { Injectable } from '@angular/core';
import { WeatherResponseDTO } from '../../models/weather-response.dto';

@Injectable()
export class HistoryService {

  private historyKey = 'searchHistory';

  getHistory(): WeatherResponseDTO[] {
    return JSON.parse(localStorage.getItem(this.historyKey) || '[]');
  }

  getHistoryById(id: number) {
    const history = this.getHistory();
    return history[id];
  }

  addHistory(weather: WeatherResponseDTO): void {
    const history = this.getHistory();
    history.unshift(weather);
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  removeHistoryItem(id: number) {
    const history = this.getHistory();
    history.splice(id, 1);
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  clearHistory(): void {
    localStorage.removeItem(this.historyKey);
  }

}
