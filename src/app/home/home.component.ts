import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

import { TranslateService } from 'ng2-translate';

import { Observable, Subject } from 'rxjs';

declare var $: any;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
 
  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    public translate: TranslateService
  ) {
    // this.translate.addLangs(['en', 'zh-cn']);
    // this.translate.setDefaultLang('en');

    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/en|zh-cn/) ? browserLang : 'en');

    this.translate.use('zh');

    let source = Observable.from([1, 2, 3]);
    let subject = new Subject();
    let multicasted = source.multicast(subject);
    multicasted.subscribe({
      next: (v) => console.log('observerA:' + v)
    });
    multicasted.subscribe({
      next: (v) => console.log('observerB: ' + v)
    });
    multicasted.connect();
  }

  public ngOnInit() {
    this.localState.value = '22222';
    console.log('hello `Home` component');
    console.log('jquery test - ' + $('#split-button').html());
    // console.log($.AdminLTE.options);
    // this.title.getData().subscribe(data => this.data = data);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
