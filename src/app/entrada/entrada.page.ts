import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
})
export class EntradaPage implements OnInit {

  constructor(
    private nativeStorage: NativeStorage,
    private router: Router,
    private translate: TranslateService) {

      this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'pt']);
      this.translate.setDefaultLang('en');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/de|en|es|fr|it|pt/) ? browserLang : 'en');
  }

  ngOnInit() {
  }

  finish() {
    this.nativeStorage.setItem('tutorialComplete', true);
    this.router.navigateByUrl('/home');
  }

  openUrl() {
    window.open('https://projetobarbershop-1620.firebaseapp.com/login', '_system', 'location=yes');
  }

}
