import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryDetailComponent } from './history-detail.component';
import { HistoryService } from '../../../../core/services/history.service';
import { ActivatedRoute } from '@angular/router';
import { WeatherResultComponent } from '../../../../shared/components/weather-result/weather-result.component';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { of } from 'rxjs';


class MockHistoryService {
  getHistoryById(id: number) {
    return {
      location: { name: 'Test City', localtime: '2025-01-22', lat: 0, lon: 0 },
      current: { temp_c: 25, temp_f: 77, condition: 'Clear', wind_kph: 10, humidity: 60 }
    };
  }
}

class MockFavoritesService {
  
  addFavorite(city: string) {
    return of(true);
  }

  removeFavorite(city: string) {
    return of(true);
  }
}


class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => {
        if (key === 'id') {
          return '1'; 
        }
        return null;
      }
    }
  };
}

describe('HistoryDetailComponent', () => {
  let component: HistoryDetailComponent;
  let fixture: ComponentFixture<HistoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HistoryDetailComponent,
        WeatherResultComponent, 
      ],
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
      ],
      providers: [
        { provide: HistoryService, useClass: MockHistoryService },  
        { provide: FavoritesService, useClass: MockFavoritesService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
