import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather.routing';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';
import { CoreModule } from '../../core/core.module';

import { WeatherService } from './services/weather.service';
import { SharedModule } from '../../shared/shared.module';
import { WeatherDataComponent } from './components/weather-data/weather-data.component';

@NgModule({
  declarations: [
    WeatherSearchComponent,
    WeatherDataComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    WeatherRoutingModule
  ],
  providers: [WeatherService]
})
export class WeatherModule { }
