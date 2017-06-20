import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { LayoutRoutingModule } from './main.routes';
import { MainComponent } from './main.component';
import { MainHeaderComponent } from './header/main-header.component';
import { MainSidebarComponent } from './sidebar/main-sidebar.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { ThemeComponent } from './theme/theme.component';
import { MainFooterComponent } from './footer/main-footer.component';
import { AdminLteService } from './admin-lte/admin-lte.services';

// modules
import { HeroesModule } from '../heroes/heroes.module';
// import { WeatherModule } from '../weather/weather.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    Ng2BootstrapModule.forRoot(),
    HeroesModule
    // WeatherModule
  ],
  exports: [MainComponent],
  declarations: [MainComponent,
    MainHeaderComponent,
    ControlSidebarComponent,
    ThemeComponent,
    MainFooterComponent,
    MainSidebarComponent
  ],
  providers: [AdminLteService],
})
export class MainModule { }
