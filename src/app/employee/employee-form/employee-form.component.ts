import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  form: any;
  dataSource: any = [];
  angForm = new FormGroup({
    names: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],

      Phone: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      Age: ['', [Validators.required]],

      Qualifications: this.fb.array([this.QualificationForm()]),
    });
  }

  QualificationForm() {
    return this.fb.group({
      InstituteName: ['', Validators.required],
      DegreeName: ['', Validators.required],
      Percentage: ['', Validators.required],

      PassingYear: ['', [Validators.required]],
    });
  }

  AddQualification() {
    if (this.form.controls.Qualifications.valid) {
      var _semesters = <FormArray>this.form.controls.Qualifications;
      _semesters.push(this.QualificationForm());
    }
  }

  RemoveQualification(index: any) {
    var _semesters = <FormArray>this.form.controls.Qualifications;
    if (_semesters.controls.length > 1) {
      _semesters.removeAt(index);
    }
  }
  get names(): FormArray {
    return this.angForm.get('_semesters') as FormArray;
  }
  onFormSubmit(): void {
    // let retrievedData = JSON.parse(
    //   localStorage.getItem('employeesList') || '[]'
    // );
    // console.log(retrievedData, 'retrievedData');
    localStorage.setItem('employeesList', JSON.stringify(this.form.value));
    // let formdata = this.form.value;
    // console.log(formdata, 'formdata');
    // const test = retrievedData.push(formdata);
    // console.log(test, 'test');
    // const jsonData = JSON.stringify(test);
    // localStorage.setItem('employeesList', jsonData);

    //console.log(jsonData);
  }
}
