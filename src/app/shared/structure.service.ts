import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Network, Notify } from './../shared';
import { AppState } from '../app.service';

import {
    TranslateService
} from 'ng2-translate';

@Injectable()


export class StructureService {

    private static SITE_STRUCTURE_LIST = AppState.DOMAIN + "/structures/all";
    constructor(
        private network: Network,
        private translate: TranslateService,
        private appState: AppState,
        private notify: Notify) {
        this.notify.setRootContext(this.appState.getRootViewContainer());
    }
    public getStructuresListByType(param) {
        return new Promise<any>((resolve) => {
            this.network.getOfPromise(StructureService.SITE_STRUCTURE_LIST, {
                type: param.type,
                parentId: param.parentId
            }).then((res) => {
                if (res.result === AppState.HTTP_SUCCESS) {
                    resolve(res);
                } else {
                    this.translate.get("SITE." + res.code).subscribe((message: string) => {
                        this.notify.warning(message);
                    });
                }
            }, (error) => {
                this.translate.get('SYSTEM_ERROR').subscribe((message: string) => {
                    this.notify.error(message);
                });
            });
        });
    }
}