import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'O9XdVyOrUECYCAy0c6ZohFaUwy2xXR5w';
  private _historial:string[] = [];
  private servicioURL = 'https://api.giphy.com/v1/gifs';

  //TO DO cambiar any por su tipo
  public resultados: Gif[] = [];



  get historial (){
    return [...this._historial];
  }



  constructor (private http: HttpClient){

    
    //EL PARSE ES EL CASO OPUESTO AL STRINGIFY Toma un objeto mediante el stringify y lo regresa a lo que era.
    //ESTO SI GUARDA EL LOCAL STORAGE Y LO MUESTRA
    
    /*
    if( localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!) 
     } 
    O Tambien  puede ser así
     Es mucho mas simple, además asi no explota cuando borro el local storage porque estoy devolviendo un arreglo vacío
     */
     this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
     this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


  }


  buscarGifs( query:string ){

   
    //Esto igual los dbz o DBZ para que sean iguales independiente del lower o upper 
    query = query.trim().toLowerCase();
    

    //Esto lo ingresa si es que no existe gracias al splice.
    if ( !this._historial.includes(query) ){
      this._historial.unshift(query);
      //Esto limita la cantidad de registros en el array del historial.
      this._historial = this._historial.splice (0,10);

      //Esto almacena lo buscado en un array dentro del LocalStorgae pero aun no lo mantiene al reiniciar.
      localStorage.setItem('historial', JSON.stringify( this._historial )  );

    }



    const params = new HttpParams().set('api_key', this.apiKey)
                                   .set('limit', '25')
                                   .set('q', query)

    console.log(params.toString());
    




    //Para ocupar este tipo de petición puede hacerse importando el Modulo Http en Module.ts pero tambien se puede usar el fetch apy de JS que lo escribiré como comentario abajo.
    //El SearchGifResponse es la interfaz que exporté desde postman con tipado typescript de esta manera en vez de memorizar las propiedades del gif el interfaz me las rellena.
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        //resp.data[0].images.downsized_small;

        //Almaceno lo ultimo guardado de imagenes
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
        


    /* 
     primero que nada se le pone async a buscarGifs que es mi bsuqueda.
     luego esto:


     const resp = await fect ('LINK DE LA API');
     const data = await resp.json();
     console.log (data);
    */
   
    
    //Prueba
    console.log(this._historial)





  }









}
  
