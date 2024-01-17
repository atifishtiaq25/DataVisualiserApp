import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, FileLoaderComponent, DataTableComponent],
      imports: [MatToolbarModule, MatIconModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('dataVisualiserApp');
  });

  it('should render the toolbar with the correct elements', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();

    const menuButton = toolbar.query(By.css('button[aria-label="Example icon-button with menu icon"]'));
    expect(menuButton).toBeTruthy();

    const linkedInButton = toolbar.query(By.css('button[aria-label="share"]'));
    expect(linkedInButton).toBeTruthy();
  });
});