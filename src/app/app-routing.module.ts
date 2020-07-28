import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'entrada',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'horario',
    loadChildren: './horario/horario.module#HorarioPageModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'criarConta',
    loadChildren: './criar-conta/criar-conta.module#CriarContaPageModule'
  },
  {
    path: 'resetarConta',
    loadChildren: './resetar-conta/resetar-conta.module#ResetarContaPageModule'
  },

  {
    path: 'meus-horarios',
    loadChildren: './meus-horarios/meus-horarios.module#MeusHorariosPageModule'
  },
  { path: 'entrada',
    loadChildren: './entrada/entrada.module#EntradaPageModule'
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
