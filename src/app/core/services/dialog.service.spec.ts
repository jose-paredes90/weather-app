import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogService } from './dialog.service';
import { ConfirmationComponent } from '../../shared/components/confirmation/confirmation.component';

describe('DialogService', () => {
  let service: DialogService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useValue: spy }
      ]
    });

    service = TestBed.inject(DialogService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open confirmation modal with correct parameters', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true), close: null });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    service.confirmationModal('Are you sure?', 'Yes', 'No', '400px');

    expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmationComponent, {
      width: '400px',
      disableClose: true,
      data: {
        description: 'Are you sure?',
        okText: 'Yes',
        cancelText: 'No',
      },
    });
  });
});