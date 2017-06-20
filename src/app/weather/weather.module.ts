import { NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';

import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';
import { WeatherRoutingModule } from './weather.router';

@NgModule({
    declarations: [
        WeatherComponent,
    ],
    imports: [
        CommonModule,
        WeatherRoutingModule
    ],
    exports: [WeatherComponent],
    providers: [WeatherService]

})
export class WeatherModule { }
