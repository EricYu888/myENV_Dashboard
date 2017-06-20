import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyVal } from './action-do';
import { CommunicationService } from './shared-communication.service';
import { TranslateService } from 'ng2-translate';

declare var $: any;
@Component({
  selector: 'config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css']
})
export class ConfigListComponent implements OnInit, OnDestroy {

  @Input() public total = -1;
  @Input() public currentPage = 0;
  @Input() public jsonConfig;
  @Input() public perPageSize = 15;// default
  @Input() public headerAuthRightButton;
  public headerAuthRightMatchText;
  @Input() public headerAuthRightImgBtn;
  @Input() public showTotal = false;

  @Output() public actionClick = new EventEmitter<KeyVal>();
  @Output() public pageChanged = new EventEmitter<number>();
  @Output() public orderChanged = new EventEmitter<KeyVal>();
  @Output() public onSearch = new EventEmitter<KeyVal>();
  @Output() public onLinkClick = new EventEmitter<KeyVal>();
  @Output() public onTagStatusClick = new EventEmitter<KeyVal>();
  @Output() public onToolClick = new EventEmitter<KeyVal>();
  @Output() public onTitleRightBtnClick = new EventEmitter<KeyVal>();
  @Output() public onTitleRightImgClick = new EventEmitter<KeyVal>();

  public title = '';
  public pageSizes = -1;
  public defaultSearch: KeyVal;
  public headers: KeyVal[] = [];
  public actions: KeyVal;
  public sorts = {
    'fa-sort': {
      className: 'fa-sort-amount-asc',
      sortNum: 2
    },
    'fa-sort-amount-asc': {
      className: 'fa-sort-amount-desc',
      sortNum: 0
    },
    'fa-sort-amount-desc': {
      className: 'fa-sort',
      sortNum: 1
    }
  };
  public list = [];
  public serverData = [];
  public mSub: Subscription;
  public tools = [];
  public pageTracker = 0;
  public hasNoOrder = false;
  constructor(private commun: CommunicationService, public translate: TranslateService) { }

  public ngOnInit() {
    this.title = this.jsonConfig.list.title;
    // headers
    if (this.jsonConfig.list.headers) {
      for (let header of this.jsonConfig.list.headers) {
        let kv = new KeyVal();
        kv.key = header.dataKey;
        kv.val = header;
        this.headers.push(kv);
      }
    }

    // actions
    if (this.jsonConfig.list.actions) {
      this.actions = new KeyVal();
      this.actions.key = this.jsonConfig.list.actions.header;
      let actionArray = [];
      for (let action of this.jsonConfig.list.actions.actions) {
        actionArray.push(action);
      }
      this.actions.val = actionArray;
    }

    // search
    if (this.jsonConfig.list.search) {
      this.defaultSearch = new KeyVal();
      this.defaultSearch.key = this.jsonConfig.list.search.searchBy;
      this.defaultSearch.val = this.jsonConfig.list.search;
    }

    this.mSub = this.commun.listenOnConfiglistDataChanged((data: KeyVal) => {
      this.handleList(data);
    });

    // tools
    if (this.jsonConfig.list.headerTools) {
      for (let tool of this.jsonConfig.list.headerTools) {
        let kv = new KeyVal();
        kv.key = tool.code;
        kv.val = tool;
        this.tools.push(kv);
      }
    }
    // console.log(this.headerAuthRightImgBtn);
    this.hasNoOrder = this.jsonConfig.list.hasOwnProperty('hasNoOrder');
  };

  public handleList(data: KeyVal) {
    this.serverData = data.val;
    this.pageSizes = data.key;
    if (data) {
      this.list.splice(0);
      for (let item of this.serverData) {
        let tmp = [];
        for (let header of this.headers) {
          if (item.hasOwnProperty(header.key)) {
            if (header.val.type === 3) {
              if (header.val.isJson) {
                let arr = [];
                if (item[header.key]) {
                  let arrs = JSON.parse(item[header.key]);
                  if (arrs && arrs.length > 0) {
                    let zeroE = arrs[0];
                    if (zeroE && zeroE.hasOwnProperty(header.val.pro)) {
                      arr.push(zeroE[header.val.pro]);
                    }
                    if (arrs.length >= 2) {
                      let oneE = arrs[1];
                      if (oneE && oneE.hasOwnProperty(header.val.pro)) {
                        arr.push(oneE[header.val.pro]);
                      }
                      if (arrs.length > 2) {
                        let tmpMore = [];
                        for (let index = 1; index < arrs.length; index++) {
                          let d = arrs[index];
                          if (d && d.hasOwnProperty(header.val.pro)) {
                            tmpMore.push(d[header.val.pro]);
                          }
                        }
                        if (tmpMore.length > 0) {
                          arr.push(tmpMore.toString());
                        }
                      }
                    }
                  }

                  // let divs = item[header.key].split(header.val.outerDivider);
                  // if (divs && divs.length > 0) {
                  //   if (header.val.innerDivider) {
                  //     let zeroE = divs[0];
                  //     if (zeroE && zeroE !== '') {
                  //       let ds = zeroE.split(header.val.innerDivider);
                  //       arr.push(ds[header.val.innerKeyIndex]);
                  //     }
                  //     if (divs.length >= 2) {
                  //       let oneE = divs[1];
                  //       if (oneE && oneE !== '') {
                  //         let ds = oneE.split(header.val.innerDivider);
                  //         arr.push(ds[header.val.innerKeyIndex]);
                  //       }
                  //       if (divs.length > 2) {
                  //         let tmpMore = [];
                  //         for (let index = 1; index < divs.length; index++) {
                  //           let d = divs[index];
                  //           if (d && d !== '') {
                  //             let ds = d.split(header.val.innerDivider);
                  //             tmpMore.push(ds[header.val.innerKeyIndex]);
                  //           }
                  //         }
                  //         if (tmpMore.length > 0) {
                  //           arr.push(tmpMore.toString());
                  //         }
                  //       }
                  //     }
                  //   }
                  // }
                }
                tmp.push(arr);
              } else {
                let tmpArr = [];
                let arrs = item[header.key];
                if (arrs && arrs.length > 0) {
                  tmpArr.push(arrs[0]);
                  if (arrs.length >= 2) {
                    tmpArr.push(arrs[1]);
                    if (arrs.length > 2) {
                      let tmpMore = [];
                      for (let index = 1; index < arrs.length; index++) {
                        tmpMore.push(arrs[index]);
                      }
                      if (tmpMore.length > 0) {
                        tmpArr.push(tmpMore.toString());
                      }
                    }
                  }
                }
                tmp.push(tmpArr);
              }
            } else {
              tmp.push(item[header.key]);
            }
          }
        }
        this.list.push(tmp);
      }
    }
  }

  public ngOnDestroy() {
    try {
      this.mSub.unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }

  public onPageChanged(page) {
    this.pageChanged.emit(page);
  }

  public changeOrder(event, header) {
    // if (this.hasNoOrder) {
    //   return;
    // }
    if (header.val.hasNoOrder) {
      return;
    }
    let targetObj;
    if ($(event.target).hasClass('fa')) {
      targetObj = $(event.target).parent();
    } else {
      targetObj = $(event.target);
    }
    // TODO judge order, judge colum
    let othersSorts = targetObj.siblings().find('i:not(fa-sort)');
    for (let element of othersSorts) {
      let classAry = $(element).attr('class').split(' ');
      $(element).removeClass(classAry[classAry.length - 1]);
      $(element).addClass('fa-sort');
    }
    let iObj = targetObj.find('i');
    let classNames = iObj.attr('class');
    let classNameAry = classNames.split(' ');
    let lastClassName = classNameAry[classNameAry.length - 1];
    iObj.removeClass(lastClassName);
    iObj.addClass(this.sorts[lastClassName].className);
    let tmp = new KeyVal();
    tmp.key = header.key;
    tmp.val = this.sorts[this.sorts[lastClassName].className].sortNum;
    this.orderChanged.emit(tmp);
  }

  public search(value) {
    if (this.defaultSearch) {
      for (let header of this.headers) {
        if (header.key === this.defaultSearch.key) {
          let tmp = new KeyVal();
          tmp.key = header.key;
          tmp.val = value;
          this.onSearch.emit(tmp);
          break;
        }
      }
    }
  }

  public onRightBtnClick() {
    this.onTitleRightBtnClick.emit();
  }

  public onRightImgClick() {
    this.onTitleRightImgClick.emit();
  }

  public doAction(index, action, event) {
    let tmp = new KeyVal();
    tmp.key = action;
    tmp.val = this.serverData[index];
    this.actionClick.emit(tmp);
    event = event || window.event;
    event.stopPropagation();
  }

  public clickLine(index) {
    let tmp = new KeyVal();
    tmp.key = this.serverData[index]['id'];
    tmp.val = this.serverData[index];
    this.onLinkClick.emit(tmp);
  }

  public onTypeClick(index, type, event) {
    let tmp = new KeyVal();
    tmp.key = this.serverData[index]['id'];
    tmp.val = this.serverData[index];
    this.onTagStatusClick.emit(tmp);
    event = event || window.event;
    event.stopPropagation();
  }

  public toolClick(param) {
    console.log(param);
    console.log('-------param');
    this.onToolClick.emit(param);
  }

  public gotoFirstPage() {
    $('#spyPagination').click();
  }


  public changeTitle(t) {
    setTimeout(() => {
      this.title = t;
    });
  }

  public goPage(pageSpy, p) {
    if (pageSpy.value === '0') {
      pageSpy.value = 1;
      this.pageTracker = 1;
      $('#gospy').click();
      this.pageChanged.emit(pageSpy.value);
    } else if (Number(pageSpy.value)) {
      if (pageSpy.value < 0) {
        pageSpy.value = 1;
      }
      let l = this.list.length;
      if (l < this.perPageSize) {
        l = this.perPageSize;
      }
      if (pageSpy.value > Math.ceil(this.pageSizes / l)) {
        pageSpy.value = Math.ceil(this.pageSizes / l);
      }

      this.pageTracker = Number(pageSpy.value);
      $('#gospy').click();
      this.pageChanged.emit(pageSpy.value);
    }
  }

  public setAuthMatchText(val) {
    this.headerAuthRightMatchText = val;
  }
}
