import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private catbaseUrl: string = 'assets/Apis/cat.json';
  private getprdctUrl: string = 'assets/Apis/addprdct.json';
  private productsUrl1: string = 'assets/Apis/catproductbyid.json';
  private productsUrl2: string = 'assets/Apis/addprdct.json';
  private data: any[] = [];

  constructor(private httpclient: HttpClient) {}

  // Load all categories
  getAllCat(): Observable<any> {
    return this.httpclient.get<any[]>(this.catbaseUrl);
  }

  // Get all products
  getProduct(): Observable<any> {
    return this.httpclient.get<any[]>(this.getprdctUrl);
  }

  // Save a new product
  saveProduct(obj: any): Observable<any> {
    return this.httpclient.post<any>('https://dummyjson.com/products/add', obj);
  }

  // Get all products combined from multiple sources
  getAllProducts(): Observable<any> {
    return forkJoin([
      this.httpclient.get<any>(this.productsUrl1),
      this.httpclient.get<any>(this.productsUrl2),
    ]).pipe(
      map(([data1, data2]) => {
        // Combine data arrays
        this.data = [...data1.data, ...data2.data];
        return this.data;
      })
    );
  }

  // Get a product by ID
  getProductById(productId: number): any | undefined {
    // Search for the product in the combined data array
    const product = this.data.find((prod: any) => prod.productId === productId);
    return product;
  }

  // Delete a product by ID
  deleteprdct(id: any): Observable<any> {
    return this.httpclient.get<any>(`https://freeapi.miniprojectideas.com/api/Ecommerce/DeleteProductById?id=${id}`);
  }

  // Update a product
  updateProduct(): Observable<any> {
    return this.httpclient.get<any>('https://freeapi.miniprojectideas.com/api/BigBasket/UpdateProduct');
  }
}
