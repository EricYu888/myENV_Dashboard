import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyVal } from './action-do';
import { CommunicationService } from './shared-communication.service';
import { TranslateService } from 'ng2-translate';
declare var $: any;

@Component({
  selector: 'font-checkbox',
  template: '<span class="thumb" [class.thumb-line]="recoverClazz" (click)="onMyClick()"><i class="fa m2" [class.fa-check-square-o]="currentStatus" [class.fa-square-o]="!currentStatus"></i> <span class="content-block m2">{{content | translate}}</span></span>',
  styleUrls: ['./font-checkbox.component.css']
})
export class FontCheckBoxComponent implements OnInit, OnDestroy {

  @Input() public currentStatus = false;
  @Input() public content = '';

  @Output() public onCheckChanged = new EventEmitter<any>();

  public list = [];
  public mSub: Subscription;
  @Input() public recoverClazz = false;
  constructor(private commun: CommunicationService, public translate: TranslateService) { }

  public ngOnInit() {

  };

  public ngOnDestroy() {

  }

  public onMyClick() {
    if (this.currentStatus) {
      this.currentStatus = false;
    } else {
      this.currentStatus = true;
    }
    this.onCheckChanged.emit(this.currentStatus);
  }

  public setSelected(selected) {
    this.currentStatus = selected;
    this.onCheckChanged.emit(this.currentStatus);
  }

  public triggerCallbackChecked() {
    this.currentStatus = true;
    this.onCheckChanged.emit(this.currentStatus);
  }

}
