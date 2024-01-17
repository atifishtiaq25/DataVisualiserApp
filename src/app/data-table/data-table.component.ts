import { Component, OnInit, ViewChild } from '@angular/core';
import { CsvDataService } from '../services/csvData.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditRowComponent } from '../edit-row/edit-row.component';
import { MatDialog } from '@angular/material/dialog';
import Papa  from 'papaparse';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})

export class DataTableComponent implements OnInit {

  fileLoaded = false;
  newRow: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  downloadableCsv: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private csvDataService: CsvDataService, private dialog: MatDialog) { }
  
  ngOnInit() {
    this.csvDataService.csvData$.subscribe(data => {
      if (data && data.length > 0) {
        this.fileLoaded = true;
        let row = data[0];
        Object.keys(row).map((key, index) => {row[key] = ""});
        this.newRow = row;

        this.dataSource = new MatTableDataSource(data);
        
        setTimeout(()=>{
          this.dataSource.paginator = this.paginator;
        });
        this.displayedColumns = Object.keys(data[0]);
      }
    },
    (error: any) => {
      console.error('Error loading data', error);
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator
    } 
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileLoaded = true;
    }
  }

  openEditDialog(rowData: any, isNewRow: boolean): void {
    const dialogRef = this.dialog.open(EditRowComponent, {
      width: '700px',
      height: '900px',
      data: {rowData, isNewRow}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.dataSource.data) {
        console.log(this.dataSource);
        if (isNewRow) {
          this.dataSource.data.push(result);
        } else {
          const index = this.dataSource.data.findIndex(item => item === rowData);
          if (index !== -1) {
            this.dataSource.data[index] = result;
          }
        }
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  downloadFile(){
    const csvData = Papa.unparse([this.dataSource.data]);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

    let link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
