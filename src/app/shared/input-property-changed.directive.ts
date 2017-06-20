import { Directive, ElementRef, Input, Optional, OnInit, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
@Directive({ selector: '[input-property-change]' })
export class InputPropertyChangeDirective implements OnInit, OnChanges {

  @Input() public in;
  @Output() public onChanged = new EventEmitter<any>();
  constructor(public el: ElementRef) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (!changedProp.isFirstChange()) {
        let from = JSON.stringify(changedProp.previousValue);
        // console.log(`${propName} changed from ${from} to ${to}`);
        this.onChanged.emit();
      }
    }
  }

}
