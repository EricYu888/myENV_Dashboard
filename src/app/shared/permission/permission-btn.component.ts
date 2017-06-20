import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Optional } from '@angular/core';
import { KeyVal } from './action-do';
import { TranslateService } from 'ng2-translate';
import { MAPPING } from './permission-mapping-template';

declare var $: any;

@Component({
  selector: 'permission-button',
  template: '<button [ngClass]="localClazz" has-permission [model]="model" [menu]="menu" [action]="action" (click)="onMyClick()">{{content | translate}}</button>'
})
export class PermissionBtnComponent implements OnInit, OnDestroy {

  @Input() public rule;
  @Input() public content = '';
  @Input() public clazz;
  @Output() public onButtonClick = new EventEmitter<any>();
  public localClazz = { btn: true };
  public model;
  public menu;
  public action;
  constructor(public translate: TranslateService) {
   }

  public ngOnInit() {
    if (!this.rule) {
      throw new Error('please use rule input!');
    }
    if (this.clazz) {
      this.localClazz[this.clazz] = true;
    }
    try {
      let arrays = this.rule.split(MAPPING.MAPPING_DIVIDER);
      if (arrays.length >= 2) {
        // no action
        this.model = arrays[0];
        this.menu = arrays[1];
        if (arrays.length === 3) {
          this.action = arrays[2];
        }
      }
    } catch (error) {

    }

  };

  public ngOnDestroy() {

  }

  public onMyClick() {
    this.onButtonClick.emit();
  }

}
