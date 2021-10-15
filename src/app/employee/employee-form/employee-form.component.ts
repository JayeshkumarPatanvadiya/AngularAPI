import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
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
  age: number | undefined;
  calAge: number | undefined;
  maxDate: Date;
  currentYear: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,

    private route: ActivatedRoute //route used for  get Id from List compoenent
  ) {
    this.maxDate = new Date(Date.now()); // set today day as max date, used in date validation
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [Math.random().toString(36).substr(2, 3)],
      FirstName: ['', Validators.required],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      DOB: ['', [Validators.required]],
      Age: [this.calAge, [Validators.required]],
      Qualifications: this.fb.array([this.QualificationForm()]),
    });

    this.form.controls['Age'].disable(); // age calculate based on Date of birth
    this.currentYear = new Date().getFullYear();

    this.employeeId = this.route.snapshot.params['id']; // route get id from list component
    if (this.employeeId != null) {
      this.EditForm();
    }
    this.onValueChanges(); // value changed of DOB , age calc fun
    this.ageCalculator; // value changed of DOB , age calc fun
  }
  onValueChanges(): void {
    this.form.get('DOB').valueChanges.subscribe((val: any) => {
      this.age = val; //bind age with DOB
      if (this.age) {
        const convertAge = new Date(this.age);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        this.calAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
        this.form.get('Age').setValue(this.calAge);
        this.form.controls['Age'].disable();
      }
    });
  }

  EditForm() {
    var employeesData = JSON.parse(
      localStorage.getItem('employeesList') || '{}'
    );

    // filter array based on Id,only 1 record selected
    var filter_array = employeesData.find((x: any) => x.id == this.employeeId);

    this.qualificationFormIndex = filter_array.Qualifications.length;

    //fetch all Qualification Record based on Id and based on that added control on that
    for (let control of filter_array.Qualifications) {
      var numberOfFormArray = <FormArray>this.form.controls.Qualifications;
      numberOfFormArray.push(this.QualificationForm());
    }

    if (this.employeeId != null) {
      this.form.patchValue({
        ...filter_array, //automatically added all the updated records => ...ObjectName
      });
    }
  }

  QualificationForm() {
    return this.fb.group({
      InstituteName: ['', Validators.required],
      DegreeName: ['', Validators.required],
      Percentage: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern('^([1-9][0-9]?)$'),
        ],
      ],
      PassingYear: [
        '',
        [Validators.required, , Validators.minLength(4), this.PassingYearCheck],
      ],
    });
  }

  AddQualification() {
    if (this.form.controls.Qualifications.valid) {
      var _qualifications = <FormArray>this.form.controls.Qualifications;
      _qualifications.push(this.QualificationForm());
    }
  }

  RemoveQualification(index: any) {
    var _qualifications = <FormArray>this.form.controls.Qualifications;
    if (_qualifications.controls.length > 1) {
      _qualifications.removeAt(index);
    }
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      var emploeeList = [];
      if (localStorage.getItem('employeesList')) {
        // localStorage.setItem('employeesList', JSON.stringify(this.form.value));

        // Parse the serialized data back into an aray of objects
        var employeeListLocalStorage = localStorage.getItem('employeesList');
        emploeeList = JSON.parse(employeeListLocalStorage || '{}');

        // Push the new data (whether it be an object or anything else) onto the array
        emploeeList.push(this.form.getRawValue());

        // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('employeesList', JSON.stringify(emploeeList));
      } else {
        emploeeList.push(this.form.getRawValue());
        localStorage.setItem('employeesList', JSON.stringify(emploeeList));
      }
      this.router.navigate(['employee']);
    } else {
      this.form.markAllAsTouched();
    }
  }
  onFormUpdate(employeeId: any) {
    var employeesData = JSON.parse(
      localStorage.getItem('employeesList') || '{}'
    );

    let index = employeesData.findIndex((x: any) => x.id == employeeId);

    if (employeesData && this.form.valid) {
      //Bind Updated value, based on index number
      employeesData[index] = this.form.getRawValue();

      // Save the new item with updated value
      localStorage.setItem('employeesList', JSON.stringify(employeesData));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your data Updated successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['employee']);
    }
  }

  ageCalculator() {
    if (this.age) {
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.calAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    }
  }

  PassingYearCheck(passingYear: FormControl) {
    let year = passingYear.value;
    let currentyear = new Date().getFullYear();
    let yearCal = currentyear - year;
    console.log(yearCal);
    if (yearCal < 0) {
      console.log('>=0', yearCal);
      return {
        passingYear: false,
      };
    }
    return null;
  }
}
