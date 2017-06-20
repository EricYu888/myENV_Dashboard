import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AdminLteService } from './admin-lte/admin-lte.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';

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
  private toggle: Subject<any> = new BehaviorSubject<any>(null);

  constructor(
    public adminLteService: AdminLteService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    // this.bodyClasses = 'skin-blue sidebar-mini';
    // this.body = document.getElementsByTagName('body')[0];
    this.adminLte = adminLteService.getAdminLte();
  }

  public ngOnInit() {
    // add the the body classes
    // this.body.classList.add('skin-blue');
    // this.body.classList.add('sidebar-mini');
    this.router.navigate(['weather/weather-center'], { relativeTo: this.route });
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
    this.adminLteService.setup();
  }


  public broadcastToggleChanged(data: boolean) {
    this.toggle.next(data);
  }

  public registerToggleChangeListener(onChanged: (data: string) => void): Subscription {
    return this.toggle.subscribe({
      next: (u) => {
        if (u !== null) {
          onChanged(u);
        }
      }
    });
  }

  public unregisterToggleChangeListener() {
    try {
      this.toggle.unsubscribe();
    } catch (error) {

    }
  }

  public fromMainHeaderTgl(toggleStatus) {
    // if (toggleStatus === true) {
    //   this.broadcastToggleChanged(true);
    // } else {
    //   this.broadcastToggleChanged(false);
    // }
    // alert(toggleStatus);
  }
 
}
