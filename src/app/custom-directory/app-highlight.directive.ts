import { Directive, ElementRef, OnInit } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private eleRef: ElementRef) {
    // eleRef.nativeElement.style.background = 'red';
  }

  ngOnInit() {
    this.eleRef.nativeElement.style.background = 'blue';
  }
}
