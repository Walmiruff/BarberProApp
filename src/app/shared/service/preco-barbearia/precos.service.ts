import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import { IArray } from './precos';

@Injectable({
  providedIn: 'root'
})
export class PrecosService {
  private readonly API = `${environment.API}precos`;
  private PATH = 'precos/';

  constructor(
    private httpclient: HttpClient,
    private http: Http,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  getListaPrecos(codigo: number) {
    try {

      return this.db.object<IArray[]>(this.PATH + codigo + '/array').valueChanges();
    } catch {
    }
  }



}
