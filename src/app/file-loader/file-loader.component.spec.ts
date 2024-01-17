import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FileLoaderComponent } from './file-loader.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CsvDataService } from '../services/csvData.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('FileLoaderComponent', () => {
  let component: FileLoaderComponent;
  let fixture: ComponentFixture<FileLoaderComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let csvDataServiceSpy: jasmine.SpyObj<CsvDataService>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    csvDataServiceSpy = jasmine.createSpyObj('CsvDataService', ['loadData']);

    TestBed.configureTestingModule({
      declarations: [FileLoaderComponent],
      imports: [MatSnackBarModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: CsvDataService, useValue: csvDataServiceSpy }      ],
    });

    fixture = TestBed.createComponent(FileLoaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});