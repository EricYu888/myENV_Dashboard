import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, SESSION_STORAGE } from '../../app.service';
import { AdminLteService } from './../admin-lte/admin-lte.services';
import { MainService } from './../main.service';
import { User } from './../models/user';
declare var $: any;
@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  public adminLte: any;
  public index: any;
  public user: User;

  public userInfo: any;
  public showFlag: boolean;
  public showFlagRit: boolean;
  constructor(
    public appState: AppState,
    public router: Router,
    public adminLteService: AdminLteService,
    public mainService: MainService) {
    this.adminLte = this.adminLteService.getAdminLte();

    this.showFlag = false;
    this.showFlagRit = false;
  }


  public ngOnInit() {
    // to do sth.
  }

  public ngOnDestroy() {
    // this.mainService.currentUser.unsubscribe();
  }



  public sidebarToggleClick(event) {
    event.stopPropagation();
    this.adminLteService.onSidebarToggleEvent();
  }

  public onControlSidebarClick(event) {
    event.stopPropagation();
    this.adminLteService.onControlSidebarToggleEvent();
  }


}
