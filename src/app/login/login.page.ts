import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../shared/auth/auth.service';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isUserLoggedIn: any = false;
  userInfo: any = {};
  mostraRedefinirSenha: boolean;
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
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.mostraRedefinirSenha = true;
    this.configurarFormulario();
  }

  onClick() {

    this.router.navigate(['criarConta']);
  }


  onClick2() {

    this.router.navigate(['resetarConta']);
  }

  loginWithFB() {
    this.authService.signWithFacebook()
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((error: any) => {
        this.presentToastErrorLogin();
      });
  }


  loginWithTW() {
    this.authService.signWithTwitter()
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((error: any) => {
        this.presentToastErrorLogin();
      });
  }


  loginWithGP() {
    this.authService.signWithGoogle()
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((error: any) => {
        this.presentToastErrorLogin();
      });
  }






  onSubmit() {
    if (this.formulario.valid === true) {
      this.authService.signIn(this.formulario)
        .then(() => {
          this.router.navigate(['home']);
        })
        .catch((error: any) => {
          this.mostraRedefinirSenha = false;
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


  async presentToastErrorLogin() {


    if (this.browserLg === 'en') {
      const toast = await this.toastCtrl.create({
        message: 'Error logging in! :(',
        duration: 3000
      });
      toast.present();
    }


    if (this.browserLg === 'pt') {
      const toast = await this.toastCtrl.create({
        message: 'Erro ao entrar! :(',
        duration: 3000
      });
      toast.present();
    }


    if (this.browserLg === 'de') {
      const toast = await this.toastCtrl.create({
        message: 'Fehler beim Einloggen! :(',
        duration: 3000
      });
      toast.present();
    }



    if (this.browserLg === 'es') {
      const toast = await this.toastCtrl.create({
        message: 'Error al iniciar sesión! :(',
        duration: 3000
      });
      toast.present();
    }



    if (this.browserLg === 'fr') {
      const toast = await this.toastCtrl.create({
        message: 'Erreur de connexion! :(',
        duration: 3000
      });
      toast.present();
    }



    if (this.browserLg === 'it') {
      const toast = await this.toastCtrl.create({
        message: 'Errore durante l\'accesso! :(',
        duration: 3000
      });
      toast.present();
    }

  }



}
