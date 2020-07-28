import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidations } from '../models/form-validations';


import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;

  browserLg: string;
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en', 'es', 'fr', 'it', 'pt']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/de|en|es|fr|it|pt/) ? browserLang : 'en');
    this.browserLg = browserLang;
  }

  ngOnInit() {
  }

  get errorMessage() {

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
        if (this.browserLg === 'en') {
          return FormValidations.getErrorMsgEN(this.label, propertyName, this.control.errors[propertyName]);
        }

        if (this.browserLg === 'pt') {
          return FormValidations.getErrorMsgPT(this.label, propertyName, this.control.errors[propertyName]);
        }

        if (this.browserLg === 'de') {
          return FormValidations.getErrorMsgDE(this.label, propertyName, this.control.errors[propertyName]);
        }


        if (this.browserLg === 'es') {
          return FormValidations.getErrorMsgES(this.label, propertyName, this.control.errors[propertyName]);
        }


        if (this.browserLg === 'fr') {
          return FormValidations.getErrorMsgFR(this.label, propertyName, this.control.errors[propertyName]);
        }


        if (this.browserLg === 'it') {
          return FormValidations.getErrorMsgIT(this.label, propertyName, this.control.errors[propertyName]);
        }

      }
    }



    return null;
  }

}
