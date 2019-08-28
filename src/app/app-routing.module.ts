import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'openings', loadChildren: './openings/openings.module#OpeningsPageModule' },
  { path: 'status', loadChildren: './status/status.module#StatusPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
