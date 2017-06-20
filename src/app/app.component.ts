/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ViewContainerRef
} from '@angular/core';
import { AppState } from './app.service';
import {
  TranslateService,
  DefaultLangChangeEvent,
  TranslationChangeEvent,
  LangChangeEvent
} from 'ng2-translate';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl : './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = '';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState,
    public vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
    this.translate.use(browserLang);
    this.appState.currentLanguage = browserLang;
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.appState.setRootViewContainer(this.vcr);
  }

  public ngOnDestroy() {
   
  }

}


/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
