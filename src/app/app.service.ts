import { Injectable, ViewContainerRef } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';

export const SESSION_STORAGE = {
  MENU: { SIDEBAR: 'MENU_SIDERBAR' },
  USER: { INFO: 'USER_INFO' },
  COMMON: { MASTER: 'MASTER_INFO' },
  PERMISSION: { SUPERUSER: 'SUPER_USER' }
};
export type InternalStateType = {
  [key: string]: any
};
@Injectable()
export class AppState {
  public static DOMAIN = require('../assets/config.json').DOMAIN;
  public static WEBSOCKET=require('../assets/config.json').WEBSOCKET;
  public static HTTP_SUCCESS = 'SUCCESS';
  public static USER_SESSIONSTORAGE = 'userInfo';

  public static PERPAGE_SIZE_CONFIGURATION = 15;

  public globalTmpStore: any; // used for all module tmp store

  // private globalLang: Subject<any> = new BehaviorSubject<any>(null);
  // private theme: Subject<any> = new BehaviorSubject<any>(null);
  // public alertTotalCate: Subject<any> = new BehaviorSubject<any>(null);
  // public caseTotalCate: Subject<any> = new BehaviorSubject<any>(null);
  // public alertDetailPopup: Subject<any> = new BehaviorSubject<any>(null);
  // public caseDetailPopup: Subject<any> = new BehaviorSubject<any>(null);
  // private userLoadedSub: Subject<any> = new BehaviorSubject<any>(null);
  // private menuChange: Subject<any> = new BehaviorSubject<any>(null);
  //public caseAlertDetailPopupId: Subject<any> = new BehaviorSubject<any>(null);


  public _state: InternalStateType = {};

  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  public _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }

  public viewContainerRef: ViewContainerRef;
  public setRootViewContainer(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  public getRootViewContainer(): ViewContainerRef {
    return this.viewContainerRef;
  }
    public onMenuSlide(direction) {
    // this.menuChange.next(direction);
  }


  public currentLanguage = 'zh';


  public imgType = {
    "jpg": 1,
    "jpeg": 2,
    "png": 12,
    "bmp": 20,
    "gif": 3
  }
  public fileType = {
    "bmp": 20,
    "jpg": 1,
    "jpeg": 2,
    "gif": 3,
    "doc": 4,
    "docx": 5,
    "xls": 6,
    "xlsx": 7,
    "ppt": 8,
    "pptx": 9,
    "zip": 10,
    "pdf": 11,
    "png": 12,
    "txt": 13,
    "csv": 14,
    "wps": 15,
    "rar": 16,
    "html": 17,
    "htm": 18,
    "conf": 19
  }
  public excelType = {
    "xls": 1,
    "xlsx": 2
  }

  public statusAction = {
    "No Action": 0,
    "Opened": 1,
    "In-process": 2,
    "Closed": 3
  }
  public statusNames = {
    "0": "Unclaimed",
    "1": "In-process",
    "2": "Closed"
  }
  public statusNamesCase = {
    "0": "Opened",
    "1": "In-process",
    "2": "Closed"
  }

  public closureAction = {
    0: "ALERT.DETAIL.CLOSURE.NOACTION",
    1: "ALERT.DETAIL.CLOSURE.SENSORREPAIR",
    2: "ALERT.DETAIL.CLOSURE.OPERATIONALCHANGE",
    3: "ALERT.DETAIL.CLOSURE.SCHEDULEDMAINTENANCE",
    4: "ALERT.DETAIL.CLOSURE.UNPLANNEDMAINTENANCE",
    5: "ALERT.DETAIL.CLOSURE.OTHERS"
  }
  // public closureActions = [
  //   { id: 0, value: "No Action" },
  //   { id: 1, value: "Sensor Repair" },
  //   { id: 2, value: "Operational Change" },
  //   { id: 3, value: "Scheduled Maintenance" },
  //   { id: 4, value: "Unplanned Maintenance" },
  //   { id: 5, value: "Others" }
  // ]
  // public closureActions_cn = [
  //   { id: 0, value: "无操作" },
  //   { id: 1, value: "传感器维修" },
  //   { id: 2, value: "运作改变" },
  //   { id: 3, value: "预订维修" },
  //   { id: 4, value: "非计划检查" },
  //   { id: 5, value: "其他" }
  // ]
  // public closureAction_cn = {
  //   0: "无操作",
  //   1: "传感器维修",
  //   2: "运作改变",
  //   3: "预订维修",
  //   4: "非计划检查",
  //   5: "其他"
  // }
}
