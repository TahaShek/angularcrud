import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  createApi(payload:any){
   return   this.http.post('http://localhost:1111/ProductDataToDatabase/ProductData',payload)
  }
  getProductApi(){
    return this.http.get('http://localhost:1111/GetProductDataFromDatabase/GetProductData')
  }
}
