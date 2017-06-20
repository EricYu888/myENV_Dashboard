import { Directive, ElementRef, Input, Optional, OnInit, OnChanges, SimpleChange, Output, EventEmitter, HostListener } from '@angular/core';
import { PermissionDirectiveConfig } from './permission-config';
import { SharedModule } from './../share.module';
@Directive({ selector: '[has-permission]' })
export class PermissionDirective implements OnInit, OnChanges {

  @Input() public model;
  @Input() public menu;
  @Input() public action;
  @Input() public actionGroup:[string];
  public localConfig;
  @Output() public onDisplayChanged = new EventEmitter<any>();
  @Output() public onClick = new EventEmitter<any>();
  @Output() public onNumInGroup = new EventEmitter<any>();
  constructor(public el: ElementRef, @Optional() config: PermissionDirectiveConfig) {
    this.localConfig = config;
    // console.log(this.localConfig);
    // console.log(this.localConfig);
  }

  ngOnInit() {
    let pass = true;
    if (!this.localConfig) {
      console.log('please use share model for root');
      pass = false;
    }
    if (!this.model || !this.menu) {
      pass = false;
      //throw new Error('please input model ,menu at the same time');
    }
    if (pass) {
      this.hasPermission();
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (!changedProp.isFirstChange()) {
        let from = JSON.stringify(changedProp.previousValue);
       // console.log(`${propName} changed from ${from} to ${to}`);
        this.hasPermission();
      }
    }
  }

  @HostListener('click', ['$event.target'])
  onMyClick(htmlElement: HTMLElement) {
    this.onClick.emit(htmlElement);
  }

  public hasPermission() {
    let tmpDisplay = 'none';
    let localModel = this.localConfig.permissions.models[this.model];
    if (localModel) {
      let menu = localModel[this.menu];
     // console.log(localModel + "," + menu);

      if (menu) {
        if (this.action) {
          if (menu[this.action]) {
            tmpDisplay = 'inline-block';
          }
        } else {
          tmpDisplay = 'inline-block';
        }
        if (this.actionGroup) {
          let result = false;
          for (let item of this.actionGroup) {
            if (menu[item]) {
              result = true;
            }
          }
          this.onNumInGroup.emit(result);
        }
      } else {
        this.onNumInGroup.emit(false);
      }
    } else {
      this.onNumInGroup.emit(false);
    }
    this.el.nativeElement.style.display = tmpDisplay;
    this.onDisplayChanged.emit(tmpDisplay !== 'none');
  }
}
