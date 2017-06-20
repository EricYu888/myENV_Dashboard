import { Injectable } from '@angular/core';

declare var $: any;

// @Injectable()
export class ThemeService {
    public myThemes: any;
    constructor() {

        this.myThemes = [
            'theme-blue-dark',
            'theme-black-dark'
        ];

    }

    public setup() {
        // alert('setup');
        let tmp = this.themeGet('theme');
        if (tmp && $.inArray(tmp, this.myThemes) > -1) {
            this.changeTheme(tmp);
        }
    }
    public changeTheme(cls) {
        // alert('changeTheme');
        for (let i of this.myThemes) {
            $('body').removeClass(i);
        }
        $('body').addClass(cls);
        this.themeStore('theme', cls);
        return false;
    }
    public themeGet(name) {
        // alert('themeGet');
        if (typeof (Storage) !== 'undefined') {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }
    public themeStore(name, val) {
        // alert('themeStore');
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }
}