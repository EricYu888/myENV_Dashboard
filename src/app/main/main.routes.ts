import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
// import { WeatherComponent } from './../weather/weather.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            // {
            //     path: 'hero',
            //     loadChildren: 'app/heroes/heroes.module#HeroesModule'
            // },
            {
                path: 'weather',
                loadChildren: 'app/weather/weather.module#WeatherModule'
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {

}

// export const routedComponents = [LayoutComponent];
