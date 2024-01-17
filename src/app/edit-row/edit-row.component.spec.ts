import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditRowComponent } from './edit-row.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


describe('EditRowComponent', () => {
  let component: EditRowComponent;
  let fixture: ComponentFixture<EditRowComponent>;
  let matDialogRefMock: MatDialogRef<EditRowComponent>;
  let matDialogDataMock: any;

  beforeEach(() => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogDataMock = {};

    TestBed.configureTestingModule({
      declarations: [EditRowComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataMock }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(EditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
