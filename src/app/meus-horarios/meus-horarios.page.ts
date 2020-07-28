import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SqliteService } from '../shared/service/authSqlite/sqlite.service';


import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-meus-horarios',
  templateUrl: './meus-horarios.page.html',
  styleUrls: ['./meus-horarios.page.scss'],
})
export class MeusHorariosPage implements OnInit {

  user: any = [];
  contador: number;
  browserLg: string;

  constructor(
    private sqliteService: SqliteService,
    public alertController: AlertController,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'pt']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/de|en|es|fr|it|pt/) ? browserLang : 'en');
    this.browserLg = browserLang;
  }

  ngOnInit() {
    this.carregaLista();
  }


  carregaLista() {
    this.contador = 30;
    this.sqliteService.getAll().then(resp => {
      this.user = resp;
    });
  }


  loadData(event) {
    setTimeout(() => {
      this.contador = this.contador + 30;
      event.target.complete();
    }, 500);
  }


  async presentAlertConfirm(id: number) {

    if (this.browserLg === 'en') {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Message <strong>Delete scheduling of cell phone memory?</strong>',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Ok',
            handler: () => {
              this.sqliteService.delete(id).then(() => {
                 this.carregaLista();
              });
            }
          }
        ]
      });
      await alert.present();
    }




    if (this.browserLg === 'pt') {
      const alert = await this.alertController.create({
        header: 'Confirmar!',
        message: 'Messagem <strong>Excluir o agendamento da memória do celular?</strong>',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Ok',
            handler: () => {
              this.sqliteService.delete(id).then(() => {
                this.carregaLista();
             });
            }
          }
        ]
      });
      await alert.present();
    }



    if (this.browserLg === 'de') {
      const alert = await this.alertController.create({
        header: 'Bestätigen!',
        message: 'Botschaft <strong>Löschen Sie die Zeitplanung des Handyspeichers?</strong>',
        buttons: [
          {
            text: 'Stornieren',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Ok',
            handler: () => {
              this.sqliteService.delete(id).then(() => {
                this.carregaLista();
             });
            }
          }
        ]
      });
      await alert.present();
    }



    if (this.browserLg === 'es') {
      const alert = await this.alertController.create({
        header: 'Confirmar!',
        message: 'Mensaje <strong>¿Eliminar la programación de la memoria del teléfono celular?</strong>',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Ok',
            handler: () => {
              this.sqliteService.delete(id).then(() => {
                this.carregaLista();
             });
            }
          }
        ]
      });
      await alert.present();
    }



    if (this.browserLg === 'fr') {
      const alert = await this.alertController.create({
        header: 'Confirmer!',
        message: 'Message <strong>Supprimer la planification de la mémoire du téléphone cellulaire?</strong>',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Ok',
            handler: () => {
              this.sqliteService.delete(id).then(() => {
                this.carregaLista();
             });
            }
          }
        ]
      });
      await alert.present();
    }




    if (this.browserLg === 'it') {
      const alert = await this.alertController.create({
        header: 'Confermare!',
        message: 'Messaggio <strong>Cancellare la programmazione della memoria del telefono cellulare?</strong>',
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel',
            cssClass: 'secondary'
          },
          {
            text: 'Ok',
            handler: () => {
              this.sqliteService.delete(id).then(() => {
                this.carregaLista();
             });
            }
          }
        ]
      });
      await alert.present();
    }

  }

}
