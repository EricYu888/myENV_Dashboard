import { Component, OnInit } from '@angular/core';
import {
    TranslateService,
    DefaultLangChangeEvent,
    TranslationChangeEvent,
    LangChangeEvent
} from 'ng2-translate';

@Component({
    selector: 'header-logo',
    template: `
        <a href="javascript:void(0)" class="logo">
            <span class="logo-mini" style="font-size:12px;">
                myENV
            </span>
            <span class="logo-lg">
                <div class="img"></div>
                  myENV
            </span>
        </a>
    `
})
export class HeaderLogoComponent implements OnInit {
    constructor(public translate: TranslateService) {
    }

    public ngOnInit() {
        // TODO
    }

}
