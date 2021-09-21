import { Component, OnInit } from '@angular/core';
import { ToastrService as ToastsService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private toastr: ToastsService) {}

  ngOnInit() {}

  showToaster() {
    this.toastr.success('Your Data Saved SuccessFully!!!!.');
  }
}
