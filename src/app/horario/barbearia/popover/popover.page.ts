import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { colors } from './colors';
import { PopoverController, NavParams } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


import { HorarioService } from 'src/app/shared/service/horario-Barbearia/horario.service';
import { SqliteService } from 'src/app/shared/service/authSqlite/sqlite.service';


import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  passedId = null;
  passedNomeSalo = null;
  formulario: FormGroup;
  formularioAgen: FormGroup;
  nameClient: string;
  userIdOneSignalCliente: string;
  nomeSalao: string;
  userIdOneSignalSalao: string;
  dataAgend: string;
  hora: string;
  dataHora: any;
  datahoraSQLite: any;
  strg: string;
  browserLg: string;

  constructor(
    private popoverCtrl: PopoverController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private horarioService: HorarioService,
    private afAuth: AngularFireAuth,
    private nativeStorage: NativeStorage,
    private sqliteService: SqliteService,
    private toastCtrl: ToastController,
    private translate: TranslateService,
  ) {
    this.afAuth.authState.subscribe(user => {
      this.nameClient = user.displayName;
    });

    this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'pt']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/de|en|es|fr|it|pt/) ? browserLang : 'en');
    this.browserLg = browserLang;
  }

  ngOnInit() {

    this.nativeStorage.getItem('userIDSignal')
      .then(data => {
        this.userIdOneSignalCliente = data;
        this.configurarFormulario();
        this.configurarFormularioAgen();
      })
      .catch(() => {
        this.configurarFormulario();
        this.configurarFormularioAgen();
      });

    this.passedId = this.navParams.get('custom_id');

    this.nativeStorage.getItem('nameBarbearia')
    .then(dataNomeSalao => {
      this.nomeSalao = dataNomeSalao;
    });


   this.nativeStorage.getItem('userIdOneSignalSalao')
    .then(dataUserIdOneSignal => {
      this.userIdOneSignalSalao = dataUserIdOneSignal;
    });
  }





  closePopover() {
    this.popoverCtrl.dismiss();
  }




  enviarForm() {
    if (this.formularioAgen.valid === true) {
      this.dataHora = (new Date(this.formularioAgen.get('data').value + ' ' + this.formularioAgen.get('hora').value).toISOString());
      this.datahoraSQLite = (new Date(this.formularioAgen.get('data').value + ' ' + this.formularioAgen.get('hora').value));
      this.formulario.patchValue({
        start: this.dataHora,
        end: this.dataHora
      });

      this.horarioService.post(this.formulario)
        .then(dados => {
          this.salvaHistoricoAgendamSQLite();
          this.enviaNotificacao();
        });
    }

  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      fk: [this.passedId],
      title: [this.nameClient],
      userId: [this.userIdOneSignalCliente],
      start: [null],
      end: [null],
      color: colors.blue,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
  }

  configurarFormularioAgen() {
    this.formularioAgen = this.formBuilder.group({
      data: [new Date().toISOString().substring(0, 10), Validators.required],
      hora: [new Date().toLocaleTimeString().slice(0, 5), Validators.required],
    });
  }




  salvaHistoricoAgendamSQLite() {

    this.dataAgend = (this.datahoraSQLite).toLocaleDateString();
    this.strg = (this.datahoraSQLite).toLocaleTimeString();
    this.hora = this.strg.substring(0, this.strg.length - 3);

    this.sqliteService.insert(this.nomeSalao, this.userIdOneSignalSalao, this.dataAgend, this.hora)
      .then(() => {
        this.closePopover();
        this.presentToastInfo();
      });
  }




  async presentToastInfo() {
    if (this.browserLg === 'en') {
      const toast = await this.toastCtrl.create({
        message: 'See your appointments in My Schedules',
        duration: 3000
      });
      toast.present();
    }

    if (this.browserLg === 'pt') {
      const toast = await this.toastCtrl.create({
        message: 'Veja seus compromissos em Meus Agendamentos',
        duration: 3000
      });
      toast.present();
    }

    if (this.browserLg === 'de') {
      const toast = await this.toastCtrl.create({
        message: 'Ihre Termine finden Sie unter Meine Termine',
        duration: 3000
      });
      toast.present();
    }


    if (this.browserLg === 'es') {
      const toast = await this.toastCtrl.create({
        message: 'Vea sus citas en Mis Horarios',
        duration: 3000
      });
      toast.present();
    }


    if (this.browserLg === 'fr') {
      const toast = await this.toastCtrl.create({
        message: 'Voir vos rendez-vous dans Mes horaires',
        duration: 3000
      });
      toast.present();
    }



    if (this.browserLg === 'it') {
      const toast = await this.toastCtrl.create({
        message: 'Vedi i tuoi appuntamenti in I miei programmi',
        duration: 3000
      });
      toast.present();
    }


  }



  enviaNotificacao() {
    if (this.browserLg === 'de') {
      this.enviaNotificacaoDe();
    }

    if (this.browserLg === 'en') {
      this.enviaNotificacaoEn();
    }

    if (this.browserLg === 'es') {
      this.enviaNotificacaoEs();
    }


    if (this.browserLg === 'fr') {
      this.enviaNotificacaoFr();
    }


    if (this.browserLg === 'it') {
      this.enviaNotificacaoIt();
    }


    if (this.browserLg === 'pt') {
      this.enviaNotificacaoPt();
    }
  }



  enviaNotificacaoPt() {
    const notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window['plugins'].OneSignal
      .startInit('baeb0de8-4cee-4b31-ad72-81b3532443f1', '1004432841462')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

    const msg = {
      contents: {
        en: 'Óla, Você tem um novo cliente na sua agenda!'
      },
      include_player_ids: [this.userIdOneSignalSalao]
    };
    window['plugins'].OneSignal.postNotification(msg,
      successResponse => {
        // Sucesso
      },
      erro => {
        // Erro
      }
    );
  }

  enviaNotificacaoDe() {
    const notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window['plugins'].OneSignal
      .startInit('baeb0de8-4cee-4b31-ad72-81b3532443f1', '1004432841462')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

    const msg = {
      contents: {
        en: 'Hallo, du hast einen neuen Kunden in deinem Kalender!'
      },
      include_player_ids: [this.userIdOneSignalSalao]
    };
    window['plugins'].OneSignal.postNotification(msg,
      successResponse => {
        // Sucesso
      },
      erro => {
        // Erro
      }
    );
  }


  enviaNotificacaoEn() {
    const notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window['plugins'].OneSignal
      .startInit('baeb0de8-4cee-4b31-ad72-81b3532443f1', '1004432841462')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

    const msg = {
      contents: {
        en: 'Hello, you have a new client in your calendar!'
      },
      include_player_ids: [this.userIdOneSignalSalao]
    };
    window['plugins'].OneSignal.postNotification(msg,
      successResponse => {
        // Sucesso
      },
      erro => {
        // Erro
      }
    );
  }


  enviaNotificacaoEs() {
    const notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window['plugins'].OneSignal
      .startInit('baeb0de8-4cee-4b31-ad72-81b3532443f1', '1004432841462')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

    const msg = {
      contents: {
        en: 'Hola, tienes un nuevo cliente en tu calendario!'
      },
      include_player_ids: [this.userIdOneSignalSalao]
    };
    window['plugins'].OneSignal.postNotification(msg,
      successResponse => {
        // Sucesso
      },
      erro => {
        // Erro
      }
    );
  }



  enviaNotificacaoFr() {
    const notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window['plugins'].OneSignal
      .startInit('baeb0de8-4cee-4b31-ad72-81b3532443f1', '1004432841462')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

    const msg = {
      contents: {
        en: 'Bonjour, vous avez un nouveau client dans votre agenda!'
      },
      include_player_ids: [this.userIdOneSignalSalao]
    };
    window['plugins'].OneSignal.postNotification(msg,
      successResponse => {
        // Sucesso
      },
      erro => {
        // Erro
      }
    );
  }



  enviaNotificacaoIt() {
    const notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window['plugins'].OneSignal
      .startInit('baeb0de8-4cee-4b31-ad72-81b3532443f1', '1004432841462')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();

    const msg = {
      contents: {
        en: 'Ciao, hai un nuovo cliente nel tuo calendario!'
      },
      include_player_ids: [this.userIdOneSignalSalao]
    };
    window['plugins'].OneSignal.postNotification(msg,
      successResponse => {
        // Sucesso
      },
      erro => {
        // Erro
      }
    );
  }


}
