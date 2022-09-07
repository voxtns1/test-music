import { ExtraOptions, Route, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

const routerConfig: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
};

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(e => e.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
