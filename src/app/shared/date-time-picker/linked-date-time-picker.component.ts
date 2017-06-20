import {
  Component, Output, Input, EventEmitter, HostListener, AfterViewInit, OnDestroy,
  SimpleChanges, OnChanges, NgModule
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppState } from './../../app.service';

declare var $: any;
declare var moment: any;
@Component({
  selector: 'linkeddatetime',
  template: `
        <div class="datetimepicker">
          <div class='col-md-6 reduce-padding no-padding'>
              <div class="form-group">
                  <div class='input-group date' id='datetimepicker1'>
                      <input id="input1" type='text' class="form-control timepicker " [class.alarm]="linkedDate.fr == ''" [attr.readonly]="readonly" [(ngModel)]="linkedDate.fr" />
                      <span class="input-group-addon">
                          <span class="glyphicon glyphicon-calendar"></span>
                      </span>
                  </div>
              </div>
          </div>
          <div class='col-md-6 no-padding-right reset-padding'>
              <div class="form-group">
                  <div class='input-group date' id='datetimepicker2'>
                      <input id="input2" type='text' class="form-control timepicker" [class.alarm]="linkedDate.to == ''" [attr.readonly]="readonly" [(ngModel)]="linkedDate.to" />
                      <span class="input-group-addon">
                          <span class="glyphicon glyphicon-calendar"></span>
                      </span>
                  </div>
              </div>
          </div>
      </div>
      `,
  styles: [
    `.datetimepicker *[hidden] { display: none; }
     .alarm {border-color:#e70012 !important; border-right:none}`
  ]
})

export class LinkedDatetime implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('datetimepicker') datetimepickerOptions: any = {};
  @Input() readonly: boolean = null;

  public linkedDate = { fr: '', to: '' };
  public toDate = 0;
  public mSub: Subscription;

  @HostListener('dateChange', ['$event'])
  onChange = (_: any) => {
    console.log(_);
  }
  onTouched = () => {
  }

  constructor(ngControl: NgControl, public appState: AppState) {
    ngControl.valueAccessor = this;
  }

  ngAfterViewInit() {
    this.init();
  }

  ngOnDestroy() {
    try {
      this.mSub.unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }

  writeValue(value: any): void {
    if (value) {
      this.linkedDate = value;
      if (this.linkedDate.to) {
        $('#datetimepicker2').data("DateTimePicker").date(this.linkedDate.to)
      }
    }

  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  checkEmptyValue(e: any) {
    const value = e.target.value;
    if (value === '') {
      //this.dateChange.emit(null);
    }
  }

  private init(): void {
    let option1 = {
      format: 'YYYY-MM-DD HH:mm',
      locale: moment.locale('zh-cn')
    };
    let option2 = {
      useCurrent: false,
      format: 'YYYY-MM-DD HH:mm',
      locale: moment.locale('zh-cn')
    };
    $('#datetimepicker1').datetimepicker(option1);
    $('#datetimepicker2').datetimepicker(option2);


    $("#datetimepicker1").on("dp.change", (e) => {
      $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
      if (e.date) {
        if (this.toDate != 0 && (e.date.toDate().getTime() - this.toDate) > 0) {
          $('#datetimepicker2').data("DateTimePicker").date(e.date);
        }
        this.linkedDate.fr = $('#input1').val();
      }
    });
    $("#datetimepicker2").on("dp.change", (e) => {
      if (e.date) {
        this.linkedDate.to = $('#input2').val();
        this.toDate = e.date.toDate().getTime();
      }
    });
   
  }
}
