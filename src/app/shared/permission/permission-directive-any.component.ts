import { Directive, ElementRef, Input, Optional, OnInit } from '@angular/core';
import { PermissionDirectiveConfig } from './permission-config';
import { MAPPING } from './permission-mapping-template';
@Directive({ selector: '[has-permission-any]' })
export class PermissionDirective implements OnInit {

    @Input() public rule;
    public localConfig;
    public model: any;
    public menu: any;
    public action: any;
    constructor(public el: ElementRef, @Optional() config: PermissionDirectiveConfig) {
        this.localConfig = config;
    }

    ngOnInit() {
        if (!this.localConfig) {
            throw new Error('please use share model for root');
        }
        if (!this.rule) {
            throw new Error('please input model ,menu ,action at the same time');
        }
        let tmpDisplay = 'none';
        let arrays = this.rule.split(MAPPING.MAPPING_DIVIDER);
        if (arrays.length >= 2) {
            // no action
            this.model = arrays[0];
            this.menu = arrays[1];
            if (arrays.length === 3) {
                this.action = arrays[2];
            }
        }
        let localModel = this.localConfig.permissions.models[this.model];
        if (localModel) {
            let menu = localModel[this.menu];
            if (menu && menu[this.action]) {
                tmpDisplay = 'block';
            }
        }
        this.el.nativeElement.style.display = tmpDisplay;
    }
}
