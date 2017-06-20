import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyVal } from './action-do';
import { CommunicationService } from './shared-communication.service';
import { TranslateService } from 'ng2-translate';
declare var $: any;

@Component({
  selector: 'single-list',
  templateUrl: './single-list.component.html',
  styleUrls: ['./single-list.component.css']
})
export class SingleListComponent implements OnInit, OnDestroy {

  @Input() public header = '';
  @Input() public checkedItem = -1;
  @Input() public slimScrollFlag;
  @Input() public toolsFlag;
  @Input() public slimScrollHeight = 300;
  @Input() public singleFlag = false;
  @Input() public readFlag = false;
   
  @Output() public onMultipleChoice = new EventEmitter<any>();
  @Output() public onSingleChoice = new EventEmitter<any>();

  public list = [];
  public mSub: Subscription;
  public multiples = {};
  public defaultIndex = { 1: '' };
  constructor(private commun: CommunicationService, public translate: TranslateService) { }

  public ngOnInit() {
    this.mSub = this.commun.listenOnChecklistDataChanged((data) => {
      this.list = data;
    });

    if (this.slimScrollFlag) {
      this.toolsFlag = false;
      $('.slimscroll-box').slimScroll({
        height: this.slimScrollHeight + 'px',
      });
      $('.box-tools').hide();
    } else if (this.toolsFlag) {
      this.slimScrollFlag = false;
      $('.box-tools').show();
    } else if (this.slimScrollFlag && this.toolsFlag) {
      this.toolsFlag = false;
      $('.box-tools').hide();
    } else {
      $('.box-tools').hide();
    }

  };

  public ngOnDestroy() {
    try {
      // this.mSub.unsubscribe();
    } catch (error) {
      console.log(error);
    }

  }

  public onItemClick(item, event) {
    if (this.readFlag) {
      return false;
    }
    event = event || window.event;
    let target = event.target || event.srcElement;
    let $this = $(target);
    let parentObj = $this.parent().parent();
    parentObj.find('.activity').removeClass('activity');
    $this.addClass('activity');
    this.checkedItem = item.key;
    this.onSingleChoice.emit(item);
  }

  public onMultipleItemClick(item, event) {
    if (this.readFlag) {
      return false;
    }
    event = event || window.event;
    event.stopPropagation();
    let target = event.target || event.srcElement;
    let $this = $(target);
    let iObj = $this.find('i');
    if (iObj.hasClass('fa-check-square-o')) {
      if (0 < $this.find('i').length) {
        $this.find('i').removeClass();
        $this.find('i').addClass('fa fa-square-o');
      }
      this.removeItem(item);
    } else {
      if (0 < $this.find('i').length) {
        $this.find('i').removeClass();
        $this.find('i').addClass('fa fa-check-square-o');
      }
      this.addItem(item);
    }
    this.onMultipleChoice.emit(this.multiples);
  }

  public toggleCheck(item, event) {
    event = event || window.event;
    event.stopPropagation();
    let target = event.target || event.srcElement;
    let $this = $(target);
    if ($this.hasClass('fa-check-square-o')) {
      $this.removeClass();
      $this.addClass('fa fa-square-o');
      this.removeItem(item);
    } else {
      $this.removeClass();
      $this.addClass('fa fa-check-square-o');
      this.addItem(item);
    }
    this.onMultipleChoice.emit(this.multiples);
  }


  public removeItem(item) {
    if (this.multiples[item.key]) {
      delete this.multiples[item.key];
    }
  }

  public addItem(item) {
    this.multiples[item.key] = item.val;
  }

  public setDefaultIndex(param) {
    this.multiples = param;
    this.defaultIndex = param;
  }

  public updateList(param) {
    this.multiples={};
    this.list = param;
    //console.log(this.list);
  }
}
