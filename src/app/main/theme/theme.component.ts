import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { AdminLteService } from './../admin-lte/admin-lte.services';

declare var $: any;

@Component({
    selector: 'theme-select',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit, OnDestroy {
    private mySkins: any;
    constructor(public adminLteService: AdminLteService) {

        this.mySkins = [
            'theme-dark',
            'theme-light',
            'skin-blue',
            'skin-black',
            'skin-red',
            'skin-yellow',
            'skin-purple',
            'skin-green',
            'skin-blue-light',
            'skin-black-light',
            'skin-red-light',
            'skin-yellow-light',
            'skin-purple-light',
            'skin-green-light'
        ];

    }
    public onChangeThemeClick(skin) {
        if ($(this).hasClass('knob')) {
            return;
        }
        this.changeSkin(skin);
    }

    public ngOnInit() {
        // TODO
        this.setup();
    }

    public ngOnDestroy() {
        // TODO
    }

    public setup() {
        // alert('setup');
        let tmp = this.skinGet('skin');
        if (tmp && $.inArray(tmp, this.mySkins) > -1) {
            this.changeSkin(tmp);
        }
    }
    public changeSkin(cls) {
        // alert('changeSkin');
        for (let i of this.mySkins) {
            $('body').removeClass(i);
        }
        $('body').addClass(cls);
        this.skinStore('skin', cls);
        return false;
    }
    public skinGet(name) {
        // alert('skinGet');
        if (typeof (Storage) !== 'undefined') {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }
    public skinStore(name, val) {
        // alert('skinStore');
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }
}