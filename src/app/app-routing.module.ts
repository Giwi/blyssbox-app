import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'openings', loadChildren: './openings/openings.module#OpeningsPageModule' },
  { path: 'status', loadChildren: './status/status.module#StatusPageModule' },
  { path: 'lightnings', loadChildren: './lightnings/lightnings.module#LightningsPageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
