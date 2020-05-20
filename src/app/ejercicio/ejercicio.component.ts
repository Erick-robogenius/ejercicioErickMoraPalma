import { Component, OnInit } from '@angular/core';
import { EjercicioService } from '@app/services/ejercicio.service';
import { ejercicios } from '@app/interface/ejercicios';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss'],
})
export class EjercicioComponent implements OnInit {
  numero: number;
  // Arrays que contendran los valores multiples del 3  5 y 7
  multiples_3: any = [];
  multiples_5: any = [];
  multiples_7: any = [];
  repetidos: any = [];
  repetidos1: any = [];
  numeros: any;
  //  variable que tendra los datos de firebase  para mostrar
  ejersave: any = [];

  //  modelo que llevara los datos al servicio de firebase
  save = {
    consulta: '',
    multiplos3: '',
    multiplos5: '',
    multiplos7: '',
    repetidos: '',
  };
  constructor(public service: EjercicioService) {}

  ngOnInit(): void {
    this.service.get().subscribe((x: any) => {
      this.ejersave = x;
    });
  }

  // Funcion para obtener el numero
  calcular(number: any) {
    this.save.consulta = number;
    this.multiples_3 = [];
    this.multiples_5 = [];
    this.multiples_7 = [];
    this.repetidos = [];
    this.repetidos1 = [];

    // condicion para ver que el input no este vacio
    if (number == null) {
      alert('Ingresa un numero');
    } else {
      this.calculo();
      this.comparar1y2();
      this.comparar2y3();
      this.save.repetidos = this.repetidos + this.repetidos1;
      this.service.add(JSON.parse(JSON.stringify(this.save)));

      // this.service.add(this.save)
    }
  }
  /**
   * Funcion para calcular si el numero es multiplo
   */
  multiple(valor: any, multiple: any) {
    var resto = valor % multiple;
    if (resto == 0) return true;
    else return false;
  }
  calculo() {
    // bucle del 0 al numero digitado para los numeros 3 5 y 7
    for (var i = 1; i <= this.numero; i++) {
      if (this.multiple(i, 3)) this.multiples_3.push(i);
      this.save.multiplos3 = this.multiples_3;

      if (this.multiple(i, 5)) this.multiples_5.push(i);
      this.save.multiplos5 = this.multiples_5;

      if (this.multiple(i, 7)) this.multiples_7.push(i);
      this.save.multiplos7 = this.multiples_7;
    }
  }

  // para el valor de repetidos utilizamos esta funcion para comparar entre 5 y 3
  comparar1y2() {
    this.multiples_3.forEach((e1: any) =>
      this.multiples_5.forEach((e2: any) => {
        if (e1 == e2) {
          this.repetidos.push(e1);
        }
      })
    );
  }
  // para el valor de repetidos utilizamos esta funcion para comparar entre 5 y 7

  comparar2y3() {
    this.multiples_5.forEach((e1: any) =>
      this.multiples_7.forEach((e2: any) => {
        if (e1 == e2) {
          this.repetidos1.push(e1);
        }
      })
    );
  }
}
