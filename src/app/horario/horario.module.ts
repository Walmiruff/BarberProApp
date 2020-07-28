import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { HorarioPage } from './horario.page';
import { BarbeariaComponent } from './barbearia/barbearia.component';


const routes: Routes = [
  {
    path: '',
    component: HorarioPage
  },
  {
    path: ':id',
    component: BarbeariaComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HorarioPage, BarbeariaComponent]
})
export class HorarioPageModule {}
