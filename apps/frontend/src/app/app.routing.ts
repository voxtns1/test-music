import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./modules/error/error.module').then( m => m.ErrorModule)
  }
];
