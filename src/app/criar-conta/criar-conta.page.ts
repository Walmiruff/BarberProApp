import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service';
import { User } from '../shared/auth/user';

import { TranslateService } from '@ngx-translate/core';





@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {

  formulario: FormGroup;
  user$: Observable<User[]>;
  toast: any;
  browserLg: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }


  ngOnInit() {
    this.configurarFormulario();
  }

  onSubmit() {
    if (this.formulario.valid === true) {


      this.authService.createUser(this.formulario)
        .then((user: any) => {

          this.presentToast();

          this.router.navigate(['home']);

        })
        .catch((error: any) => {
          this.presentToastError(error);
        });
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }


  async presentToast() {

    if (this.browserLg === 'en') {
      const toast = await this.toastCtrl.create({
        message: 'Account created successfully!',
        duration: 2000
      });
      toast.present();
    }

    if (this.browserLg === 'pt') {
      const toast = await this.toastCtrl.create({
        message: 'Conta criada com sucesso!',
        duration: 2000
      });
      toast.present();
    }


    if (this.browserLg === 'de') {
      const toast = await this.toastCtrl.create({
        message: 'Konto erfolgreich angelegt!',
        duration: 2000
      });
      toast.present();
    }


    if (this.browserLg === 'es') {
      const toast = await this.toastCtrl.create({
        message: 'Cuenta creada con éxito!',
        duration: 2000
      });
      toast.present();
    }

    if (this.browserLg === 'fr') {
      const toast = await this.toastCtrl.create({
        message: 'Compte créé avec succès!',
        duration: 2000
      });
      toast.present();
    }

    if (this.browserLg === 'it') {
      const toast = await this.toastCtrl.create({
        message: 'Account creato con successo!',
        duration: 2000
      });
      toast.present();
    }

  }






  async presentToastError(error: any) {

    const toast = await this.toastCtrl.create({
      message: 'Ops, ' + error + ' :(',
      duration: 3000
    });
    toast.present();

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



}
