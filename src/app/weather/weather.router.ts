import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';

const weatherRoutes: Routes = [
    {
        path: 'weather-center',
        component: WeatherComponent
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(weatherRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        WeatherService
    ]
})
export class WeatherRoutingModule { }
