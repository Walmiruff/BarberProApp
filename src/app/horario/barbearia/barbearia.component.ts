import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { HorarioDom } from 'src/app/shared/service/horario-Barbearia/HorarioDom';
import { HorarioSeg } from 'src/app/shared/service/horario-Barbearia/HorarioSeg';
import { PopoverController } from '@ionic/angular';

import { HorarioTer } from 'src/app/shared/service/horario-Barbearia/HorarioTer';
import { HorarioQua } from 'src/app/shared/service/horario-Barbearia/HorarioQua';
import { HorarioQui } from 'src/app/shared/service/horario-Barbearia/HorarioQui';
import { HorarioSex } from 'src/app/shared/service/horario-Barbearia/HorarioSex';
import { HorarioSab } from 'src/app/shared/service/horario-Barbearia/HorarioSab';
import { HorarioService } from 'src/app/shared/service/horario-Barbearia/horario.service';
import { IArray } from 'src/app/shared/service/preco-barbearia/precos';
import { PrecosService } from 'src/app/shared/service/preco-barbearia/precos.service';
import { PopoverPage } from './popover/popover.page';


@Component({
  selector: 'app-barbearia',
  templateUrl: './barbearia.component.html',
  styleUrls: ['./barbearia.component.scss']
})
export class BarbeariaComponent implements OnInit, OnDestroy {

  horariosDom$: Observable<HorarioDom[]>;
  horariosSeg$: Observable<HorarioSeg[]>;
  horariosTer$: Observable<HorarioTer[]>;
  horariosQua$: Observable<HorarioQua[]>;
  horariosQui$: Observable<HorarioQui[]>;
  horariosSex$: Observable<HorarioSex[]>;
  horariosSab$: Observable<HorarioSab[]>;
  precos$: Observable<IArray[]>;
  codigoUsuario: number;


  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private precoService: PrecosService,
    public popoverCtrl: PopoverController,
    private nativeStorage: NativeStorage,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'pt']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/de|en|es|fr|it|pt/) ? browserLang : 'en');
   }



  ngOnInit() {
    this.codigoUsuario = this.route.snapshot.params['id']; // buscar o id no sub do token
    this.carregaObservables();
  }


  carregaObservables() {
    this.horariosDom$ = this.horarioService.getListaHorarioDom(this.codigoUsuario);
    this.horariosSeg$ = this.horarioService.getListaHorarioSeg(this.codigoUsuario);
    this.horariosTer$ = this.horarioService.getListaHorarioTer(this.codigoUsuario);
    this.horariosQua$ = this.horarioService.getListaHorarioQua(this.codigoUsuario);
    this.horariosQui$ = this.horarioService.getListaHorarioQui(this.codigoUsuario);
    this.horariosSex$ = this.horarioService.getListaHorarioSex(this.codigoUsuario);
    this.horariosSab$ = this.horarioService.getListaHorarioSab(this.codigoUsuario);
    this.precos$ = this.precoService.getListaPrecos(this.codigoUsuario);
  }



  gravaNome(nomeSalao: string) {
    this.nativeStorage.setItem('nameBarbearia', nomeSalao);
  }

  gravaId(userIdOneSignalSalao: string) {
    this.nativeStorage.setItem('userIdOneSignalSalao', userIdOneSignalSalao);
  }

  async openPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      componentProps: {
        custom_id: [this.route.snapshot.params['id']]
      },
      backdropDismiss: false,
    });
    return await popover.present();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.nativeStorage.remove('nameBarbearia');
    this.nativeStorage.remove('userIdOneSignalSalao');
  }

}
