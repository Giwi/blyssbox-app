import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { LightningsPageComponent } from './pages/lightnings-page/lightnings-page.component';
import { OpeningsPageComponent } from './pages/openings-page/openings-page.component';
import { StatusPageComponent } from './pages/status-page/status-page.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { StorageModule } from '@ngx-pwa/local-storage';
import  { MessageBusModule } from 'ngx-message-bus';
import { RefreshTitleComponent } from './components/refresh-title/refresh-title.component';
import { BatteryLevelComponent } from './components/battery-level/battery-level.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FavoritesPageComponent,
    HistoryPageComponent,
    LightningsPageComponent,
    OpeningsPageComponent,
    StatusPageComponent,
    RefreshTitleComponent,
    BatteryLevelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    NgbModule,
    LoggerModule.forRoot({serverLoggingUrl: '', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.OFF}),
    StorageModule.forRoot({IDBNoWrap: true, IDBDBName: 'blyssbox', LSPrefix: 'blyssbox_'}),
    MessageBusModule
  ],
  providers: [HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
