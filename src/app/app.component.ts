import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { TranslateService } from '@ngx-translate/core';

import { DatabaseService } from './shared/service/databaseSqlite/database.service';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'My Schedules',
      url: '/meus-horarios',
      icon: 'calendar'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'unlock'
    }
  ];

  isComplete: boolean;
  browserLg: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: Geolocation,
    private nativeStorage: NativeStorage,
    private dbProvider: DatabaseService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.initializeApp();

    this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'pt']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/de|en|es|fr|it|pt/) ? browserLang : 'en');
    this.browserLg = browserLang;

    if (this.browserLg === 'pt') {
      this.appPages = [
        {
          title: 'Pagina Inicial',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Listar Barbearias',
          url: '/list',
          icon: 'list'
        },
        {
          title: 'Meus Agendamentos',
          url: '/meus-horarios',
          icon: 'calendar'
        },
        {
          title: 'Entrar',
          url: '/login',
          icon: 'unlock'
        }
      ];

    }

    if (this.browserLg === 'de') {
    this.appPages = [
      {
        title: 'Startseite',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Liste Friseurläden',
        url: '/list',
        icon: 'list'
      },
      {
        title: 'Meine Termine',
        url: '/meus-horarios',
        icon: 'calendar'
      },
      {
        title: 'Anmelden',
        url: '/login',
        icon: 'unlock'
      }
    ];
  }

  if (this.browserLg === 'es') {
    this.appPages = [
      {
        title: 'Página de Inicio',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Lista de Barberías',
        url: '/list',
        icon: 'list'
      },
      {
        title: 'Mis Planes',
        url: '/meus-horarios',
        icon: 'calendar'
      },
      {
        title: 'Iniciar Sesión',
        url: '/login',
        icon: 'unlock'
      }
    ];
  }


  if (this.browserLg === 'fr') {
    this.appPages = [
      {
        title: 'Page d\'accueil',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Liste des Salons de Coiffure',
        url: '/list',
        icon: 'list'
      },
      {
        title: 'Mes Horaires',
        url: '/meus-horarios',
        icon: 'calendar'
      },
      {
        title: 'S\'identifier',
        url: '/login',
        icon: 'unlock'
      }
    ];
  }



  if (this.browserLg === 'it') {
    this.appPages = [
      {
        title: 'Pagina Iniziale',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Elenco Barbieri',
        url: '/list',
        icon: 'list'
      },
      {
        title: 'I Miei Programmi',
        url: '/meus-horarios',
        icon: 'calendar'
      },
      {
        title: 'Accesso',
        url: '/login',
        icon: 'unlock'
      }
    ];
  }



}



  initializeApp() {
    this.platform.ready().then(() => {
      const options: GeolocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.geolocation.getCurrentPosition(options).then(position => {
      }).catch(err => console.log(err));


      const notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window['plugins'].OneSignal
        .startInit('baeb0de8-4cee-4b31-ad72-81b3532443f1', '1004432841462')
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
      window['plugins'].OneSignal.getIds((id) => {
        this.nativeStorage.setItem('userIDSignal', (id.userId));
      });

     // this.statusBar.styleDefault();

      this.dbProvider.createDataBase()
        .then(() => {
          this.openHomePage(this.splashScreen);
        })
        .catch(() => {
          this.openHomePage(this.splashScreen);
        });
    });

    this.carregaRederecionameneto();
  }


  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
  }


  public carregaRederecionameneto() {
    this.nativeStorage.getItem('tutorialComplete').then(resp => {
      this.isComplete = resp;
      if (this.isComplete) {
        this.router.navigateByUrl('/home');
      }
    });
  }

}
