import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CsvDataService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  csvData$: Observable<any[]> = this.dataSubject.asObservable();

  loadData(structuredData: any): void {
    this.dataSubject.next(structuredData);
  }
}