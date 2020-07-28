import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { CriarContaPage } from './criar-conta.page';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: CriarContaPage
  }
];

@NgModule({
  declarations: [CriarContaPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CriarContaPageModule { }
