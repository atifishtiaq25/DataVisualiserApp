import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-row',
  templateUrl: './edit-row.component.html',
  styleUrl: './edit-row.component.scss'
})
export class EditRowComponent implements OnInit {

  isNewRow: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditRowComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public newRow: boolean
  ) {}

  dynamicForm: FormGroup;

  ngOnInit(): void {
    this.initDynamicForm();
    this.isNewRow = this.newRow;
  }

  initDynamicForm(): void {
    const formGroupConfig = {};

    if (this.data && this.data.rowData) {
      Object.keys(this.data.rowData).forEach(key => {
        (formGroupConfig as any)[key] = [this.data.rowData[key], Validators.required];
      });
    }
  
    this.dynamicForm = this.fb.group(formGroupConfig);
  }

  onSubmit(): void {
    const formValues = this.dynamicForm.value;
    this.dialogRef.close(formValues);
  }
}