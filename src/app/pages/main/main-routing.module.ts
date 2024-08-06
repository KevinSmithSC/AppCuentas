import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'datos',
        loadChildren: () => import('./datos/datos.module').then( m => m.DatosPageModule)
      },
      {
        path: 'graficos',
        loadChildren: () => import('./graficos/graficos.module').then( m => m.GraficosPageModule)
      },
      {
        path: 'ajustes',
        loadChildren: () => import('./ajustes/ajustes.module').then( m => m.AjustesPageModule)
      }
    
    ],
    
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
