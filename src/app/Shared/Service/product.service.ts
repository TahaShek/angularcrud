import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  createApi(payload:any){
   return   this.http.post('http://localhost:2222/ProductDataToDatabase/ProductData',payload)
  }
  getProductApi(){
    return this.http.get('http://localhost:2222/GetProductDataFromDatabase/GetProductData')
  }

  getProductByid(_id:any){
    return this.http.get(`http://localhost:2222/GetProductDataFromDatabaseById/GetProductById/${_id}`)
  }
  DeleteProductByidSoft(_id:any){
   return this.http.delete(`http://localhost:2222/SoftDeletebyId/SoftDelete/${_id}`)
  }
  HardDelete(_id:any){
    return this.http.delete(`http://localhost:2222/HardDeleteFromDataBase/HardDelete/${_id}`)
  }
  UpdateById(payload:any){
    return this.http.post('http://localhost:2222/UpdateDatainDataBase/UpdateDatabyId',payload)
  }
}
