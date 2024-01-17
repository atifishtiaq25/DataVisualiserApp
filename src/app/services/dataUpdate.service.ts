import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  dataUpdated = new EventEmitter<any>();

  updateData(updatedData: any): void {
    this.dataUpdated.emit(updatedData);
  }
}
