import { HttpClient } from '@angular/common/http';
import { Injectable, input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs';
import { forkJoin } from 'rxjs';

import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ProductService {
  catbaseUrl:string='assets/Apis/cat.json';
  getprdctUrl:string='assets/Apis/addprdct.json'

  constructor(private httpclient: HttpClient) { }

  getAllCat(): Observable<any> {
    // return this.httpclient.get<any[]>(Constant.API_END_POINT+ Constant.METHODS.GET_ALL_CATEGORY);
        return this.httpclient.get<any[]>(this.catbaseUrl);

  }

  getProduct(){
    return this.httpclient.get<any[]>(this.getprdctUrl);
  }

 //mocked api
  saveProduct(obj: any): Observable<any> {
    return this.httpclient.post<any>('https://dummyjson.com/products/add', obj);
}


//get any product data to edit it 
updateProduct(){
  return this.httpclient.get<any>('https://freeapi.miniprojectideas.com/api/BigBasket/UpdateProduct');
}

deleteprdct(id:any){
  return this.httpclient.get<any>( 'https://freeapi.miniprojectideas.com/api/Ecommerce/DeleteProductById?id='+id)
}


getprdctbycatid(id:any){
  //  return this.httpclient.get<any>( 'https://freeapi.miniprojectideas.com/api/BigBasket/GetAllProductsByCategoryId?id='+id)
  return this.httpclient.get<any>( `https://dummyjson.com/c/f9bf-8809-4ab6-b493`)

}
addTocart(obj:any){
   return this.httpclient.post('https://freeapi.miniprojectideas.com/api/BigBasket/AddToCart',obj)
  //  return this.httpclient.post(`https://dummyjson.com/carts/user/`, obj)

}

public cartupdated$:Subject<boolean>=new Subject(); //to have updated cartlist from productshow addtocart btn
//RxJS is a special type of Observable that allows values to be multicasted to multiple Observers. In this case, the Subject will emit boolean values.
getcartDatabycustid(id:number){
  // return this.httpclient.get('https://freeapi.miniprojectideas.com/api/BigBasket/GetCartProductsByCustomerId?id=')
  return this.httpclient.get('assets/Apis/catproductbyid.json')
}

deletedrdfrmcart(id:number){
  return this.httpclient.get('https://freeapi.miniprojectideas.com/api/BigBasket/DeleteProductFromCartById?id='+id)
}


private productsUrl1 = 'assets/Apis/catproductbyid.json';
private productsUrl2 = 'assets/Apis/addprdct.json';

 // Load all products
 getAllProducts(): Observable<any> {
  return forkJoin([
    this.httpclient.get<any>(this.productsUrl1),
    this.httpclient.get<any>(this.productsUrl2),
  ]).pipe(
    map(([data1, data2]) => [...data1.data, ...data2.data]) // Combine data arrays
  );
}
    


  


}
