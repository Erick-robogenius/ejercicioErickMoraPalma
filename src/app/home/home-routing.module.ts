import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { EjercicioComponent } from '@app/ejercicio/ejercicio.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // En esta parte se manda a llamar a la ruta para el ejemplo
    { path: 'ejercicio', component: EjercicioComponent },
    { path: 'home', component: HomeComponent, data: { title: extract('Home') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
