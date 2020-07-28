import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'barberproDB.db',
      location: 'default'
    });
  }


  public createDataBase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => console.error(e));
  }

  private createTables(db: SQLiteObject) {
    return db.sqlBatch(
      // tslint:disable-next-line:max-line-length
      ['CREATE TABLE tbagenda (rowid INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nomebarbearia TEXT, useridbarbearia TEXT, data TEXT, horario TEXT)']
    )
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }


}
