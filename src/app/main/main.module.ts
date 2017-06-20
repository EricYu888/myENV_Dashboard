import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { LayoutRoutingModule } from './main.routes';
import { MainComponent } from './main.component';
import { ThemeComponent } from './theme/theme.component';
import { MainHeaderComponent } from './header/main-header.component';
import { MainSidebarComponent } from './sidebar/main-sidebar.component';
import { MainFooterComponent } from './footer/main-footer.component';
import { HeaderLogoComponent } from './logo/header-logo.component';
import { AdminLteService } from './admin-lte/admin-lte.services';
import { ThemeService } from './theme/theme.service';
import { LocalizeComponent } from './localize/localize.component';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { MainService } from './main.service';
import { WeatherModule } from './../weather/weather.module';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    Ng2BootstrapModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    WeatherModule
  ],
  exports: [MainComponent],
  declarations: [MainComponent,
    ThemeComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainSidebarComponent,
    HeaderLogoComponent,
    LocalizeComponent],
  providers: [AdminLteService, MainService, ThemeService],
})
export class MainModule { }
