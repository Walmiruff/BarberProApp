import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

import { HorarioDom } from './HorarioDom';
import { HorarioSeg } from './HorarioSeg';
import { HorarioTer } from './HorarioTer';
import { HorarioQua } from './HorarioQua';
import { HorarioQui } from './HorarioQui';
import { HorarioSex } from './HorarioSex';
import { HorarioSab } from './HorarioSab';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private PATHdom = 'tb_horariodom/';
  private PATHseg = 'tb_horarioseg/';
  private PATHter = 'tb_horarioter/';
  private PATHqua = 'tb_horarioqua/';
  private PATHqui = 'tb_horarioqui/';
  private PATHsex = 'tb_horariosex/';
  private PATHsab = 'tb_horariosab/';
  private PATH = 'calendario/';

  constructor(
    private httpclient: HttpClient,
    private http: Http,
    private db: AngularFireDatabase
    ) { }


  post(calendario: FormGroup) {

    return new Promise((resolve) => {
      this.db.list(this.PATH + calendario.get('fk').value)
        .push({
          start: (calendario.get('start').value).toString(),
          end: (calendario.get('end').value).toString(),
          title: calendario.get('title').value,
          userId: calendario.get('userId').value,
          color: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
          },
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true
        })
        .then((result: any) => resolve(result.key));
    });
  }


    getListaHorarioDom(codigo: number) {
      try {

        return this.db.object<HorarioDom[]>(this.PATHdom + codigo + '/array').valueChanges();

      } catch {
      }
    }


  getListaHorarioSeg(codigo: number) {
    try {
      return this.db.object<HorarioSeg[]>(this.PATHseg + codigo + '/array').valueChanges();
    } catch {
    }
  }


  getListaHorarioTer(codigo: number) {
    try {
      return this.db.object<HorarioTer[]>(this.PATHter + codigo + '/array').valueChanges();
    } catch {
    }
  }

  getListaHorarioQua(codigo: number) {
    try {
      return this.db.object<HorarioQua[]>(this.PATHqua + codigo + '/array').valueChanges();
    } catch {
    }
  }

  getListaHorarioQui(codigo: number) {
    try {
      return this.db.object<HorarioQui[]>(this.PATHqui + codigo + '/array').valueChanges();
    } catch {
    }
  }


  getListaHorarioSex(codigo: number) {
    try {
      return this.db.object<HorarioSex[]>(this.PATHsex + codigo + '/array').valueChanges();
    } catch {
    }
  }


  getListaHorarioSab(codigo: number) {
    try {
      return this.db.object<HorarioSab[]>(this.PATHsab + codigo + '/array').valueChanges();
    } catch {
    }
  }



  postHorarioDom(formulario: FormGroup) {

    return new Promise((resolve) => {
      this.db.object(this.PATHdom + formulario.get('fk').value)
        .set({ array: [formulario.value] })
        .then(() => resolve());
    });


  }

  postHorarioSeg(formulario: FormGroup) {

    return new Promise((resolve) => {
      this.db.object(this.PATHseg + formulario.get('fk').value)
        .set({ array: [formulario.value] })
        .then(() => resolve());
    });
  }


  postHorarioTer(formulario: FormGroup) {
    return new Promise((resolve) => {
      this.db.object(this.PATHter + formulario.get('fk').value)
        .set({ array: [formulario.value] })
        .then(() => resolve());
    });
  }


  postHorarioQua(formulario: FormGroup) {

    return new Promise((resolve) => {
      this.db.object(this.PATHqua + formulario.get('fk').value)
        .set({ array: [formulario.value] })
        .then(() => resolve());
    });
  }



  postHorarioQui(formulario: FormGroup) {
    return new Promise((resolve) => {
      this.db.object(this.PATHqui + formulario.get('fk').value)
        .set({ array: [formulario.value] })
        .then(() => resolve());
    });
  }


  postHorarioSex(formulario: FormGroup) {

    return new Promise((resolve) => {
      this.db.object(this.PATHsex + formulario.get('fk').value)
        .set({ array: [formulario.value] })
        .then(() => resolve());
    });
  }



  postHorarioSab(formulario: FormGroup) {

    return new Promise((resolve) => {
      this.db.object(this.PATHsab + formulario.get('fk').value)
        .set({ array: [formulario.value] })
        .then(() => resolve());
    });
  }




  putHorarioDom(formulario: FormGroup, id: number) {

    return new Promise((resolve, reject) => {
      this.db.object(this.PATHdom + id)
        .update({ array: [formulario.value] })
        .then(() => resolve())
        .catch((e) => reject(e));
    });
  }



  putHorarioSeg(formulario: FormGroup, id: number) {

    return new Promise((resolve, reject) => {
      this.db.object(this.PATHseg + id)
        .update({ array: [formulario.value] })
        .then(() => resolve())
        .catch((e) => reject(e));
    });
  }


  putHorarioTer(formulario: FormGroup, id: number) {

    return new Promise((resolve, reject) => {
      this.db.object(this.PATHter + id)
        .update({ array: [formulario.value] })
        .then(() => resolve())
        .catch((e) => reject(e));
    });
  }


  putHorarioQua(formulario: FormGroup, id: number) {

    return new Promise((resolve, reject) => {
      this.db.object(this.PATHqua + id)
        .update({ array: [formulario.value] })
        .then(() => resolve())
        .catch((e) => reject(e));
    });
  }


  putHorarioQui(formulario: FormGroup, id: number) {

    return new Promise((resolve, reject) => {
      this.db.object(this.PATHqui + id)
        .update({ array: [formulario.value] })
        .then(() => resolve())
        .catch((e) => reject(e));
    });
  }



  putHorarioSex(formulario: FormGroup, id: number) {

    return new Promise((resolve, reject) => {
      this.db.object(this.PATHsex + id)
        .update({ array: [formulario.value] })
        .then(() => resolve())
        .catch((e) => reject(e));
    });
  }



  putHorarioSab(formulario: FormGroup, id: number) {

    return new Promise((resolve, reject) => {
      this.db.object(this.PATHsab + id)
        .update({ array: [formulario.value] })
        .then(() => resolve())
        .catch((e) => reject(e));
    });
  }



  buscarPorCodigoDom(codigo: number) {
    try {

      return this.db.object<any[]>(this.PATHdom + codigo + '/array').valueChanges();

    } catch {
    }
  }

  buscarPorCodigoSeg(codigo: number) {
    try {

      return this.db.object<any[]>(this.PATHseg + codigo + '/array').valueChanges();

    } catch {
    }
  }



  buscarPorCodigoTer(codigo: number) {
    try {

      return this.db.object<any[]>(this.PATHter + codigo + '/array').valueChanges();

    } catch {
    }
  }



  buscarPorCodigoQua(codigo: number) {
    try {

      return this.db.object<any[]>(this.PATHqua + codigo + '/array').valueChanges();

    } catch {
    }
  }


  buscarPorCodigoQui(codigo: number) {
    try {

      return this.db.object<any[]>(this.PATHqui + codigo + '/array').valueChanges();

    } catch {
    }
  }


  buscarPorCodigoSex(codigo: number) {
    try {

      return this.db.object<any[]>(this.PATHsex + codigo + '/array').valueChanges();

    } catch {
    }
  }



  buscarPorCodigoSab(codigo: number) {
    try {

      return this.db.object<any[]>(this.PATHsab + codigo + '/array').valueChanges();

    } catch {
    }
  }





}

