import { MatNativeDateModule } from '@angular/material/core';
import { environment } from './../../environments/environment';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bootstrap-menu',
  templateUrl: './bootstrap-menu.component.html',
  styleUrls: ['./bootstrap-menu.component.css'],
})
export class BootstrapMenuComponent implements OnInit {
  backgroundColor = environment.navBarBackgroundColor;
  constructor() {}

  ngOnInit(): void {}
}
