import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { AdminLteService } from './admin-lte/admin-lte.services';
import { ThemeService } from './theme/theme.service';
import {
  TranslateService,
  DefaultLangChangeEvent,
  TranslationChangeEvent,
  LangChangeEvent
} from 'ng2-translate';

import { MainService } from './main.service';
import { User } from './models/user';
import { AppState } from './../app.service'
declare var $: any;
declare var AdminLTEOptions: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  public bodyClasses: string;
  public body: any;
  public adminLte: any;
  public language: string;
  @ViewChild('routeCtrl') public routeCtrl;

  constructor(
    public adminLteService: AdminLteService,
    public themeService: ThemeService,
    public translate: TranslateService,
    public mainService: MainService,
    public app: AppState) {
    // this.bodyClasses = 'skin-blue sidebar-mini';
    // this.body = document.getElementsByTagName('body')[0];
    this.adminLte = adminLteService.getAdminLte();
    // this.language = 'zh';
    // this.translate.setDefaultLang(this.language);
    // this.translate.use(this.language);

    // setTimeout(() => {
    //   this.mainService.setCurrentUser(new User('mark', ''));
    // }, 5000);

  }

  public ngOnInit() {
    // add the the body classes
    // this.body.classList.add('skin-blue');
    // this.body.classList.add('sidebar-mini');
    // this.app.onLocalUserLoadSuccessfully();
     

  }

  public onContentWrapperClick() {
    // this.adminLte = this.adminLteService.getAdminLte();
    let screenSizes = this.adminLte.options.screenSizes;
    if ($(window).width() <= (screenSizes.sm - 1) && $('body').hasClass('sidebar-open')) {
      $('body').removeClass('sidebar-open');
    }
  }

  public onResize(event) {
    // event.target.innerWidth;
    this.adminLteService.adminLteLayoutFix();
    // this.adminLteService.adminLteTreeActivate('.sidebar');
    this.adminLteService.adminLteLayoutFixSidebar();

  }

  public ngOnDestroy() {
    // remove the the body classes
    // this.body.classList.remove('skin-blue');
    // this.body.classList.remove('sidebar-mini');
  }

  public ngAfterViewInit() {
    $('body').removeClass('hold-transition');
    this.adminLteService.adminLteLayoutActivate();
    console.log(this.adminLte.options.enableControlSidebar);
    if (this.adminLte.options.enableControlSidebar) {
      console.log('enableControlSidebar');
      this.adminLteService.adminLteControlSidebarActivate();
    }
    if (this.adminLte.options.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
      $('.navbar .menu').slimscroll({
        height: this.adminLte.options.navbarMenuHeight,
        alwaysVisible: false,
        size: this.adminLte.options.navbarMenuSlimscrollWidth
      }).css('width', '100%');
    }
    this.themeService.setup();
  }

  public getCaseDetailUrlParams() {
    return this.routeCtrl.getUrlParamsBy(this.routeCtrl.linkUrls.caseDetail);
  }

  public getAlertDetailUrlParams() {
    return this.routeCtrl.getUrlParamsBy(this.routeCtrl.linkUrls.alertDetail);;
  }

  public getRelativeUrlParams(key) {
    return this.routeCtrl.getUrlParamsBy(key);
  }

  public jumpToUrl(urlParams, params?, paramsKey?) {
    this.routeCtrl.locateTo(urlParams, params, paramsKey);
  }

  public updateCustomizedMenu(former, nowData) {
    this.routeCtrl.updateCustomizedMenu(former, nowData);
  }

}
