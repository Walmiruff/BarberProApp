import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { AngularFireDatabase } from 'angularfire2/database';






@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(
    private db: AngularFireDatabase,
    //  private key = 'AIzaSyACaAqb5pMAj8oqa9tfWSzPVe66oj-8nQk',
  ) { }

  private PATH = 'userconfig/';


  getLista() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }));
  }




}
