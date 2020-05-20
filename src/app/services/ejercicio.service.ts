import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ejercicios } from '../interface/ejercicios';

@Injectable({
  providedIn: 'root',
})
export class EjercicioService {
  itemsCollection: AngularFirestoreCollection<ejercicios>;
  item: any = [];

  constructor(public afs: AngularFirestore) {
    this.itemsCollection = afs.collection('numeros');
    this.item = afs.collection('numeros').valueChanges();
  }
  // regresa los valores de firebase
  get() {
    return this.item;
  }
  // sube los datos a firebase
  add(ejer: ejercicios) {
    this.itemsCollection.add(ejer);
  }
}
