import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import {
    TranslateService,
    DefaultLangChangeEvent,
    TranslationChangeEvent,
    LangChangeEvent
} from 'ng2-translate';
import { ThemeService } from './theme.service';
import { AppState, SESSION_STORAGE } from './../../app.service';


declare var $: any;
@Component({
    selector: 'theme-select',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit, OnDestroy {
    private themes: any;
    private currentUser: any;
    private user: any;
    constructor(
        public appState: AppState,
        public translate: TranslateService,
        public themeService: ThemeService
    ) {

    }

    public ngOnInit() {
        // TODO
        // this.themeService.setup();
    }

    public ngOnDestroy() {
        // TODO
    }

}