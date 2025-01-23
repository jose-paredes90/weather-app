import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../../../../core/services/history.service';
import { WeatherResponseDTO } from '../../../../models/weather-response.dto';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrl: './history-detail.component.scss'
})
export class HistoryDetailComponent implements OnInit {

  weatherItem: WeatherResponseDTO;

  get temperatureC(): string {
    return `${this.weatherItem?.current?.temp_c}°C`;
  }

  get temperatureF(): string {
    return `${this.weatherItem?.current?.temp_f}°F`;
  }

  constructor(private readonly historyService: HistoryService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router) {}

  ngOnInit() {
    this.getHistory();
  }
  
  getHistory() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.weatherItem = this.historyService.getHistoryById(+id);
    }
  }

  back() {
    this.router.navigate(['/history']);
  }

}
