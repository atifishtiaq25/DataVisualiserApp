import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { CsvDataService } from '../services/csvData.service';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let csvDataServiceMock: jasmine.SpyObj<CsvDataService>;
  let matDialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    csvDataServiceMock = jasmine.createSpyObj('CsvDataService', ['get csvData$', 'updateCsvData']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      providers: [
        { provide: CsvDataService, useValue: csvDataServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set fileLoaded to true on file change', () => {
    const fileChangeEvent = { target: { files: [new File([''], 'test.csv')] } };
    component.onFileChange(fileChangeEvent);
    expect(component.fileLoaded).toBe(true);
  });
});