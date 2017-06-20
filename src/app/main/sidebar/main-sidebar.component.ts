import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AdminLteService } from './../admin-lte/admin-lte.services';
import { AppState, SESSION_STORAGE } from './../../app.service';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs';
import { routesMapping } from './route-mapping';
import { Notify } from './../../shared';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit, OnDestroy {
  public adminLte: any;
  public sidebar;
  public mSub: Subscription;
  public excepts = {
    defaultNavigation: { name: 'Weather', value: false, route: '/main/weather/weather-center' },
  }
  constructor(public adminLteService: AdminLteService,
    public router: Router,
    public route: ActivatedRoute,
    public appState: AppState,
    public translate: TranslateService) {
    // TODO
    this.adminLte = this.adminLteService.getAdminLte();
  }

  public ngOnInit() {
    this.router.navigateByUrl(this.excepts.defaultNavigation.route);
  }
  public ngOnDestroy() {

  }
}
