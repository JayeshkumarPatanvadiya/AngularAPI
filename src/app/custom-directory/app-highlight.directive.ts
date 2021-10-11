import { Directive, ElementRef, Renderer2 } from '@angular/core';
@Directive({
  selector: '.ccCardHover',
})
export class HighlightDirective {
  constructor(private eleRef: ElementRef, private renderer: Renderer2) {
    eleRef.nativeElement.style.background = 'red';

    renderer.setElementStyle(eleRef.nativeElement, 'backgroundColor', 'gray');
  }

  ngOnInit(): void {}
}
