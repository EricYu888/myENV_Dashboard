import { Directive, ElementRef, Input } from '@angular/core';
@Directive({ selector: '[permission-filter]' })
export class PermissionDirective {

  @Input() public model;
  @Input() public menu;
  constructor(public el: ElementRef) {
    //el.nativeElement.style.backgroundColor = 'yellow';
  }

  ngAfterViewInit() {
    console.log(this.el.nativeElement.innerText);

    this.el.nativeElement.style.display = 'none';
  }
}
