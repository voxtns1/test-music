import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeResolver } from './home.resolver';
import { NgModule } from '@angular/core';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      data: HomeResolver,
    },
    children: [
      {
        path: ':query',
        component: ResultsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
