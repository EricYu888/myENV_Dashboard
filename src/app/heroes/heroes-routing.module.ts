import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';
const heroesRoutes: Routes = [
  {
    path: 'all',
    component: HeroListComponent,
    children: [{
      path: 'hero/:id',
      component: HeroDetailComponent
    }]
  },
  {
    path: 'my',
    component: HeroListComponent,
    children: [{
      path: 'hero/:id',
      component: HeroDetailComponent
    }]
  }
  //{ path: 'hero/:id', component: HeroDetailComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroRoutingModule { }