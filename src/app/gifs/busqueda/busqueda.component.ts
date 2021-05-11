import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { element } from 'protractor';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {


  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;



  //Esto viene del service
    constructor(private GifsService: GifsService){
    }




  buscar(){
    
    const valor = this.txtBuscar.nativeElement.value;
    

    //Esto restringe que se ingreser vacios
    if( valor.trim().length === 0 ){
      return;
    }


    //Esto va a hacer es insertar nuevos valores en el nuevo array así guardarlos.
    this.GifsService.buscarGifs(valor);

    //Esto lo hace Vacio despues del enter.
    this.txtBuscar.nativeElement.value = '';



  }

 // El signo ! se utiliza para que un elemento no es null (Buscar en la documentacion de TS)


}
