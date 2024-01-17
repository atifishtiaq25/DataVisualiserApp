import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'dataVisualiserApp';

  redirectToLinkedIn(): void {
    window.location.href = 'https://www.linkedin.com/in/aatif-ishtiaq/';
  }
}
