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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  form: any;
  dataSource: any = [];
  employeeId: any;
  qualificationFormIndex: number | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [Math.random().toString(36).substr(2, 3)],
      FirstName: ['', Validators.required],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Qualifications: this.fb.array([this.QualificationForm()]),
    });

    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId != null) {
      this.EditForm();
    }
    // notice below change, we need to mark it as an formArray
    expense_expense_categories_attributes: this.fb.array([]);
  }

  CreateForm() {}

  EditForm() {
    var employeesData = JSON.parse(
      localStorage.getItem('employeesList') || '{}'
    );

    var filter_array = employeesData.find((x: any) => x.id == this.employeeId);
    console.log(filter_array);
    this.qualificationFormIndex = filter_array.Qualifications.length;

    for (let control of filter_array.Qualifications) {
      var numberOfFormArray = <FormArray>this.form.controls.Qualifications;
      numberOfFormArray.push(this.QualificationForm());
    }

    if (this.employeeId != null) {
      this.form.patchValue({
        ...filter_array,
      });
    }
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

  onFormSubmit(): void {
    if (this.form.valid) {
      // localStorage.setItem('employeesList', JSON.stringify(this.form.value));
      var emploeeList = [];
      // Parse the serialized data back into an aray of objects
      var employeeListLocalStorage = localStorage.getItem('employeesList');
      emploeeList = JSON.parse(employeeListLocalStorage || '{}');
      // Push the new data (whether it be an object or anything else) onto the array

      emploeeList.push(this.form.value);

      // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem('employeesList', JSON.stringify(emploeeList));
      console.log(emploeeList);
      this.router.navigate(['employee']);
    } else {
      alert('something went wrong!!!');
    }
  }
  onFormUpdate(employeeId: any) {
    // alert(employeeId);
    this.EditForm();
    this.router.navigate(['employee']);
  }
}
