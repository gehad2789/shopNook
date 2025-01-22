import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  catbaseUrl:string='assets/Apis/data.json';
  createprdctUrl:string='assets/Apis/addprdct.json'

  constructor(private httpclient: HttpClient) { }

  getAllCat(): Observable<any> {
    // return this.httpclient.get<any[]>(Constant.API_END_POINT+ Constant.METHODS.GET_ALL_CATEGORY);
        return this.httpclient.get<any[]>(this.catbaseUrl);

  }

  getProduct(){
    return this.httpclient.get<any[]>(this.createprdctUrl);
  }

 
  saveProduct(obj: any): Observable<any> {
    return this.httpclient.post<any>('https://dummyjson.com/products/add', obj);
}

    


  


}
