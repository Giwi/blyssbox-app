import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { OpeningsPageComponent } from './pages/openings-page/openings-page.component';
import { StatusPageComponent } from './pages/status-page/status-page.component';
import { LightningsPageComponent } from './pages/lightnings-page/lightnings-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SecurityPageComponent } from './pages/security-page/security-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'openings', component: OpeningsPageComponent },
  { path: 'status', component: StatusPageComponent },
  { path: 'lightnings', component: LightningsPageComponent },
  { path: 'history', component: HistoryPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'security', component: SecurityPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      useHash: true,
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
    //  enableTracing: !environment.production
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
