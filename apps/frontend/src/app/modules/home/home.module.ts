import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { ResultsComponent } from './results/results.component';
import { SearchModule } from '@music/frontend/components';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SearchModule],
  declarations: [HomeComponent, ResultsComponent],
})
export class HomeModule {}
