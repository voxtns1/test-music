import { CardModule, SearchModule } from '@music/frontend/components';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { ResultsComponent } from './results/results.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SearchModule, CardModule],
  declarations: [HomeComponent, ResultsComponent],
})
export class HomeModule {}
