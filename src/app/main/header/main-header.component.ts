import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AdminLteService } from './../admin-lte/admin-lte.services';
import { AppState } from './../../app.service';
import { KeyVal } from './../../shared/action-do';
declare var $: any;
@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})

export class MainHeaderComponent implements OnInit {
  @Output() public onToggleClick = new EventEmitter<any>();

  private adminLte: any;
  private index: any;

  constructor(public adminLteService: AdminLteService,
    public appState: AppState) {
    this.adminLte = this.adminLteService.getAdminLte();
    // this is aconstructor
    this.index = 1;
  }

  public ngOnInit() {
    // to do sth.
  }

  private myDropdownToggle() {
    $('.my-dropdown-menu').hide();
  }

  public sidebarToggleClick(event) {
    event.stopPropagation();
    this.adminLteService.onSidebarToggleEvent();

    console.log("event");
    console.log(event);
    if ($('body').hasClass('sidebar-open')) {
      this.onToggleClick.emit(true);
    } else {
      this.onToggleClick.emit(false);
    }
  }

  public onControlSidebarClick(event) {
    event.stopPropagation();
    this.adminLteService.onControlSidebarToggleEvent();
  }

  public changeCity(city) {
    this.appState.CityChanged(city);
  }
}
