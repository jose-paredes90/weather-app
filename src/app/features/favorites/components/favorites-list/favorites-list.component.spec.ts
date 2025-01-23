import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesListComponent } from './favorites-list.component';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { DialogService } from '../../../../core/services/dialog.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core'; 


class MockFavoritesService {
  getFavorites() {
    return [
      { 
        location: { name: 'Test City', localtime: '2025-01-22' },
        current: { temp_c: 25, condition: { text: 'Clear' }, wind_kph: 10, humidity: 60 }
      }
    ];
  }

  removeFavoriteItem(id: number) {
    
    console.log(`Favorite with ID ${id} removed`);
  }
}

class MockDialogService {
  confirmationModal(message: string) {
    return {
      afterClosed: () => of(true)
    };
  }
}

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesListComponent],
      providers: [
        { provide: FavoritesService, useClass: MockFavoritesService },
        { provide: DialogService, useClass: MockDialogService },
      ],
      schemas: [NO_ERRORS_SCHEMA]  
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
