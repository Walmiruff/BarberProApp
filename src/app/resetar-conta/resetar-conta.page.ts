import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../shared/auth/auth.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-resetar-conta',
  templateUrl: './resetar-conta.page.html',
  styleUrls: ['./resetar-conta.page.scss'],
})
export class ResetarContaPage implements OnInit {

  formulario: FormGroup;
  browserLg: string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'pt']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/de|en|es|fr|it|pt/) ? browserLang : 'en');
    this.browserLg = browserLang;
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.configurarFormulario();
  }


  onSubmit() {
    if (this.formulario.valid === true) {
      this.authService.resetPassword(this.formulario)
        .then(() => {
          this.presentToast();
          this.router.navigate(['login']);
        })
        .catch((error: any) => {
          this.presentToastError(error);
        });
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }





  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsUntouched();

      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }


  async presentToastError(error: any) {
    const toast = await this.toastCtrl.create({
      message: 'Ops, ' + error + ' :(',
      duration: 3000
    });
    toast.present();
  }


  async presentToast() {

    if (this.browserLg === 'en') {
      const toast = await this.toastCtrl.create({
        message: 'Request was sent to your email!',
        duration: 3000
      });
      toast.present();
    }

    if (this.browserLg === 'pt') {
      const toast = await this.toastCtrl.create({
        message: 'O pedido foi enviado para o seu email!',
        duration: 3000
      });
      toast.present();
    }


    if (this.browserLg === 'de') {
      const toast = await this.toastCtrl.create({
        message: 'Anfrage wurde an Ihre E-Mail gesendet!',
        duration: 3000
      });
      toast.present();
    }



    if (this.browserLg === 'es') {
      const toast = await this.toastCtrl.create({
        message: 'Solicitud fue enviada a su correo electrónico!',
        duration: 3000
      });
      toast.present();
    }



    if (this.browserLg === 'fr') {
      const toast = await this.toastCtrl.create({
        message: 'La demande a été envoyée à votre email!',
        duration: 3000
      });
      toast.present();
    }



    if (this.browserLg === 'it') {
      const toast = await this.toastCtrl.create({
        message: 'La richiesta è stata inviata alla tua email!',
        duration: 3000
      });
      toast.present();
    }



  }

}
