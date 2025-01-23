import { TestBed } from '@angular/core/testing';
import { HistoryListComponent } from './history-list.component';
import { HistoryService } from '../../../../core/services/history.service'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { DialogService } from '../../../../core/services/dialog.service'; 
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HistoryListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryListComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: HistoryService,
          useValue: {
            getHistory: () => of([{ 
              location: { name: 'Test', localtime: '2025-01-22' },
              current: { temp_c: 25, condition: { text: 'Clear' }, wind_kph: 10, humidity: 70 }
            }])
          }
        },
        {
          provide: DialogService,
          useValue: { confirmationModal: () => ({ afterClosed: () => of(true) }) }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]  
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HistoryListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
