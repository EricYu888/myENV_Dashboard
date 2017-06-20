import { Component, OnInit, EventEmitter } from '@angular/core';
import {
    TranslateService,
    DefaultLangChangeEvent,
    TranslationChangeEvent,
    LangChangeEvent
} from 'ng2-translate';
import { AppState } from './../../app.service';
 
@Component({
    selector: 'localize',
    templateUrl: 'localize.component.html'
})
export class LocalizeComponent implements OnInit {
    // @Input() language: string;
    private selectStr: string;
    private currentUser: any;
    private user: any;
    constructor(public translate: TranslateService,
        public app: AppState) {
    
    }

    public ngOnInit() {
        // TODO
    }

    
}
