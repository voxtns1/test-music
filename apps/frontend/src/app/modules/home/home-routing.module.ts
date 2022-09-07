import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
import { NgModule } from '@angular/core';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':query',
        component: ResultsComponent,
        resolve: {
          data: HomeResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
