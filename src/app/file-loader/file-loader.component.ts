import { Component, ViewChild, ElementRef } from '@angular/core';
import { CsvDataService } from '../services/csvData.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Papa  from 'papaparse';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrl: './file-loader.component.scss'
})
export class FileLoaderComponent {
   loading = false;
   fileLoaded = false;

   @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;

  constructor(private snackBar: MatSnackBar, private csvDataService: CsvDataService) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log('fileInput in component:', this.fileInput);
    if (file) {
      this.loading = true;
      this.fileLoaded = true;
      this.readCsvFile(file);
    }
  }

  readCsvFile(file: File): void {
    Papa.parse(file, {
      complete: (result) => {
        this.csvDataService.loadData(result.data);
        this.snackBar.open('File uploaded successfully', 'Close', { duration: 3000 });
        this.loading = false; 
      },
      header: true,
      error: (error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  }
}
