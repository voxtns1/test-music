import { ExtraOptions, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routing';
import { ErrorComponent } from './modules/error/error.component';

const routerConfig: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
};

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes, routerConfig)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
