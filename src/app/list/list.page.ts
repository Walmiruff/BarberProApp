import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { TranslateService } from '@ngx-translate/core';

import { HomeService } from '../shared/service/home-lista/home.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {


  home$: Observable<any[]>;
  lat1; long1; dLat; dLong: any;
  a; c; d: any;
  contador: number;

  constructor(
    private homeService: HomeService,
    private router: Router,
    public geolocation: Geolocation,
    public platform: Platform,
    public afAuth: AngularFireAuth,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'pt']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/de|en|es|fr|it|pt/) ? browserLang : 'en');
   }

  ngOnInit() {
    this.contador = 30;
    this.home$ = this.homeService.getLista();
    this.localizar();
  }


  authObserverUser(idSalao: number) {
    const authObserver = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['horario', idSalao]);
        authObserver.unsubscribe();
      } else {
        this.router.navigate(['login']);
        authObserver.unsubscribe();
      }
    });
  }

  onClick(idSalao: number) {
    this.authObserverUser(idSalao);
  }

  localizar() {
    this.platform.ready().then(() => {

      const options: GeolocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.geolocation.getCurrentPosition(options).then(position => {
        this.lat1 = position.coords.latitude;
        this.long1 = position.coords.longitude;
      }).catch(err => console.log(err));

    });
 }


 calc(lat2: number, long2: number) {
  function rad(x) { return x * Math.PI / 180; }
  const R = 6378.137; // Raio terra em km
  this.dLat = rad(lat2 - this.lat1);
  this.dLong = rad(long2 - this.long1);
  this.a = Math.sin(this.dLat / 2) * Math.sin(this.dLat / 2) +
    Math.cos(rad(this.lat1)) * Math.cos(rad(lat2)) * Math.sin(this.dLong / 2) * Math.sin(this.dLong / 2);
  this.c = 2 * Math.atan2(Math.sqrt(this.a), Math.sqrt(1 - this.a));
  this.d = R * this.c;

  return this.d;
}



loadData(event) {
  setTimeout(() => {
    this.contador = this.contador + 30;
    event.target.complete();
  }, 500);
}


}
