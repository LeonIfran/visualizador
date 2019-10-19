import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoginGuard } from './guards/auth-login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule', canActivate: [AuthLoginGuard] },
  { path: 'modal', loadChildren: './paginas/modal/modal.module#ModalPageModule', canActivate: [AuthGuard] },
  { path: 'cosas-lindas', loadChildren: './paginas/cosas-lindas/cosas-lindas.module#CosasLindasPageModule' },
  { path: 'cosas-feas', loadChildren: './paginas/cosas-feas/cosas-feas.module#CosasFeasPageModule' },
  { path: 'resultados', loadChildren: './paginas/resultados/resultados.module#ResultadosPageModule' },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
