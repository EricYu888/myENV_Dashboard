/**
 * 3rds require
 * npm install ng2-toastr --save
 * npm install ng2-pagination --save
 * */

import { ModuleWithProviders, NgModule, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { Ng2PaginationModule } from 'ng2-pagination';
import { ConfigListComponent } from './configuration.list.component';
import { SingleListComponent } from './single.list.component';
import { FontCheckBoxComponent } from './font-checkbox.component';
import { CommunicationService } from './shared-communication.service';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { StructureService } from './structure.service';
import { TranslateService } from 'ng2-translate';
import { PermissionDirective } from './permission/permission-directive';
import { PermissionDirectiveConfig } from './permission/permission-config';
import { PermissionBtnComponent } from './permission/permission-btn.component';
import { LinkedDatetime } from './date-time-picker/linked-date-time-picker.component';
import { AppState } from './../app.service';
import { InputPropertyChangeDirective } from './input-property-changed.directive';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './../assets/i18n', '.json');
}

@NgModule({
  declarations: [
    ConfigListComponent,
    SingleListComponent,
    FontCheckBoxComponent,
    PermissionDirective,
    PermissionBtnComponent,
    LinkedDatetime,
    InputPropertyChangeDirective
  ],
  imports: [
    ToastModule.forRoot(),
    Ng2PaginationModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    CommonModule,
    FormsModule
  ],

  exports: [ConfigListComponent, SingleListComponent, FontCheckBoxComponent, PermissionDirective
    , PermissionBtnComponent, LinkedDatetime, TranslateModule, CommonModule, FormsModule, Ng2PaginationModule, InputPropertyChangeDirective],
  providers: [CommunicationService, StructureService]

})
export class SharedModule {
  constructor(public app: AppState, public config: PermissionDirectiveConfig, public translate: TranslateService) {

  }
  static forRoot(config: PermissionDirectiveConfig): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: PermissionDirectiveConfig, useValue: config }
      ]
    };
  }

}
