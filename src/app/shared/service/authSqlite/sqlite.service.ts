import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { User } from './user';
import { DatabaseService } from '../databaseSqlite/database.service';



@Injectable({
  providedIn: 'root'
})
export class SqliteService {



  constructor(
    private sqlite: SQLite,
    public dbProvider: DatabaseService,
    private httpclient: HttpClient,
  ) { }

  user: any = [];


  public insert(nomeBarbearia: string, userIdBarbearia: string, data: string, horario: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        const sql = 'INSERT INTO  tbagenda (nomebarbearia, useridbarbearia, data, horario) VALUES (?, ?, ?, ?)';
        const dados = [nomeBarbearia, userIdBarbearia, data, horario];

        return db.executeSql(sql, dados)
          .catch((e) => console.error(e));

      })
      .catch((e) => console.error(e));
  }



  public delete(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        const sql = 'DELETE FROM tbagenda WHERE rowid = ?';
        const dados = [id];

        return db.executeSql(sql, dados)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }





  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT * FROM tbagenda', [])
          .then((res: any) => {
            this.user = [];
            if (res.rows.length > 0) {
              for (let i = 0; i < res.rows.length; i++) {
                const agenda = res.rows.item(i);
                this.user.push(agenda);
              }
              return this.user;
            }
            return null;

          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


}
